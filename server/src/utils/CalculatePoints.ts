import { Post } from '../domain/entities';
import { TweetFetchObject } from '../infrastructure/external/TwitterAPIV2';

export class AnalyseTweet {
    constructor(private readonly post: Post) {}

    calculate(tweet: TweetFetchObject) {
        let points = 0;
        const {
            entities: { hashtags, cashtags, mentions, keywords }
        } = this.post;

        // Hashtags
        const ht = tweet.entities.ht?.map((ht) => ht.toLowerCase());
        const htSet = new Set(ht);
        const htPoints = hashtags?.filter((_ht) => htSet.has(_ht.toLowerCase())).length;
        points += htPoints ?? 0;

        // Cashtags
        const ct = tweet.entities.ct?.map((ct) => ct.toLowerCase());
        const ctSet = new Set(ct);
        const ctPoints = cashtags?.filter((_ct) => ctSet.has(_ct.toLowerCase())).length;
        points += ctPoints ?? 0;

        // Mentions
        const mn = tweet.entities.mn?.map((mn) => mn.toLowerCase());
        const mnSet = new Set(mn);
        const mnPoints = mentions?.filter((_mn) => mnSet.has(_mn.toLowerCase())).length;
        points += mnPoints ?? 0;

        // Keywords
        const text = tweet.text.toLowerCase();
        const kwPoints = keywords?.filter((keyword) => text.includes(keyword.toLowerCase())).length;
        points += kwPoints ?? 0;

        return points;
    }
}
