import { ReferencedTweetV2, TwitterApi } from 'twitter-api-v2';
import { Submission } from '../../domain/entities';
import { chunkifyArray, wait } from '../../utils';
import { SubmissionType } from '../../domain/entities/Submission';
import { ApplicationError } from '../../application/errors';
import CONFIG from '../../config/config';
import axios from 'axios';

type MyClassProps = {
    fetchSize?: number;
};

export type TweetFetchObject = Submission & {
    text: string;
    entities: {
        ht: string[] | undefined;
        ct: string[] | undefined;
        mn: string[] | undefined;
    };
    submissionType: SubmissionType;
    author: {
        id: string;
        username: string;
    };
};

type FetchObject = (TweetFetchObject | null)[];

type CollectionObject = { success: FetchObject; failed: Submission[] };

export const spawnNewClient = () => {
    return new TwitterApi({
        clientId: CONFIG.TWITTER_TOKENS.TWITTER_CLIENT_ID,
        clientSecret: CONFIG.TWITTER_TOKENS.TWITTER_CLIENT_SECRET
    });
};

/**
 * Represents a class for interacting with the Twitter API v2.
 */
export class TwitterAPIV2 {
    private fetchSize: number;
    private client: TwitterApi;

    /**
     * Constructs a new TwitterAPIV2 instance.
     * @param {Partial<MyClassProps>} props - Optional properties to configure the TwitterAPIV2 instance.
     */
    constructor({ fetchSize = 99 }: Partial<MyClassProps> = {}) {
        this.fetchSize = fetchSize;
        this.client = spawnNewClient();
    }

    generateAuthLink(callback_url: string) {
        return this.client.generateOAuth2AuthLink(callback_url, {
            scope: ['tweet.read', 'users.read', 'offline.access']
        });
    }

    async getTokenAndData(code: string, codeVerifier: string, callback_url: string) {
        const concatAuth = `${CONFIG.TWITTER_TOKENS.TWITTER_CLIENT_ID}:${CONFIG.TWITTER_TOKENS.TWITTER_CLIENT_SECRET}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(concatAuth).toString('base64')}`
            },
            data: new URLSearchParams({
                code,
                grant_type: 'authorization_code',
                redirect_uri: callback_url,
                code_verifier: codeVerifier,
                client_id: CONFIG.TWITTER_TOKENS.TWITTER_CLIENT_ID
            }),
            url: 'https://api.twitter.com/2/oauth2/token'
        };

        try {
            const res = await axios(options);
            const data = await res.data;
            if (res.status === 200) {
                const client = new TwitterApi(data.access_token);
                const { data: userObject } = await client.v2.me({
                    'user.fields': ['profile_image_url', 'url', 'location']
                });
                console.log({ auth: data, user: userObject });
                return { auth: data, user: userObject };
            }
        } catch (error) {
            // TODO axios logs error here, look into this later
            // console.log(error);
        }
        return null;
    }

    isValidAccessToken() {
        return false;
    }

    /**
     * Starts the process of fetching tweets for the provided submissions.
     * @param {Submission[]} submissions - The submissions for which tweets need to be fetched.
     * @returns {Promise<FetchObject>} A promise that resolves with the fetched tweets.
     */
    async start(submissions: Submission[]): Promise<CollectionObject | null> {
        if (!submissions || !submissions.length) return null;
        const collection: FetchObject = [];
        const failed: Submission[] = [];
        const desiredTimeInterval = 60000;
        let lastRequestTimestamp = Date.now();

        const _subArr = chunkifyArray<Submission>(submissions, this.fetchSize);

        for (const arr of _subArr) {
            const currentTimestamp = Date.now();
            const timeElapsed = currentTimestamp - lastRequestTimestamp;

            if (timeElapsed < desiredTimeInterval) {
                const delay = desiredTimeInterval - timeElapsed;
                await wait(delay);
            }

            try {
                const result = await this.fetchTweets(arr);
                collection.push(...result);
            } catch (error) {
                if (error instanceof ApplicationError) {
                    failed.push(...(error.data as Submission[]));
                }
                continue;
            }

            lastRequestTimestamp = Date.now();
        }

        return { success: collection, failed };
    }

    /**
     * Fetches tweets for the provided submissions and combines them with original submission data.
     * @param {Submission[]} tweets - The submissions for which tweets need to be fetched.
     * @returns {Promise<FetchObject>} A promise that resolves with the fetched tweets.
     */
    private async fetchTweets(tweets: Array<Submission>): Promise<FetchObject> {
        try {
            // Join all tweet IDs into a comma-separated string
            const ids = tweets.map((tweet) => tweet.tweetId).join(',');

            // Fetch tweets
            const rawTweets = await this.client.v2.tweets(ids, {
                expansions: 'author_id',
                'tweet.fields': 'text,entities,referenced_tweets',
                'user.fields': 'username'
            });

            // Map each returned tweet to a combined object
            const combinedTweets = rawTweets.data.map((tweet) => {
                // Find the original tweet object from the provided submissions
                const originalTweet = tweets.find((t) => t.tweetId === tweet.id);
                if (!originalTweet) return null;

                // Check if the fetched data includes users
                if (!rawTweets.includes?.users) return null;

                // Find the author of the tweet
                const author = rawTweets.includes.users.find((user) => user.id === tweet.author_id);
                if (!author) return null;

                // TODO - pass actual post ID to getSubmissionType
                const submissionType = TwitterAPIV2.getSubmissionType('', tweet.referenced_tweets);

                // Combine original object with fetched data
                return {
                    ...originalTweet,
                    text: tweet.text,
                    entities: {
                        ht: tweet.entities?.hashtags?.map((item) => item.tag),
                        ct: tweet.entities?.cashtags?.map((item) => item.tag),
                        mn: tweet.entities?.mentions?.map((item) => item.username)
                    },
                    submissionType,
                    author: {
                        id: author.id,
                        username: author.username
                    }
                };
            });

            return combinedTweets;
        } catch (error) {
            // Handle API request errors gracefully
            console.error('Error fetching tweets:', error);
            throw new ApplicationError('Error fetching tweets', 500, tweets); // Throw custom application error
        }
    }

    /**
     * Retrieves the submission type based on the referenced tweets.
     * @param {string} referencedTweetId - The ID of the referenced tweet.
     * @param {ReferencedTweetV2[]} referenced_tweets - The referenced tweets.
     * @returns {SubmissionType} The submission type.
     */
    static getSubmissionType(referencedTweetId: string, referenced_tweets?: ReferencedTweetV2[]): SubmissionType {
        if (referenced_tweets) {
            if (
                referenced_tweets?.some(
                    (refTweet) => refTweet.id === referencedTweetId && refTweet.type === 'retweeted'
                )
            ) {
                return SubmissionType.RETWEET;
            } else if (
                referenced_tweets?.some((refTweet) => refTweet.id === referencedTweetId && refTweet.type === 'quoted')
            ) {
                return SubmissionType.QUOTE;
            } else if (
                referenced_tweets?.some(
                    (refTweet) => refTweet.id === referencedTweetId && refTweet.type === 'replied_to'
                )
            ) {
                return SubmissionType.COMMENT;
            }
        }

        return SubmissionType.POST;
    }
}
