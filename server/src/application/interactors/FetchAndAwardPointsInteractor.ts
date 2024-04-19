import { TwitterAPIV2 } from '../../infrastructure/external';
import { AnalyseTweet } from '../../utils/CalculatePoints';
import { ApplicationError } from '../errors';
import { PostUseCase, SubmissionUseCase, UserUseCase } from '../useCases';

class FetchAndAwardPointsInteractor {
    constructor(
        private postUseCase: PostUseCase,
        private submissionUseCase: SubmissionUseCase,
        private userUseCase: UserUseCase,
        private fetchTweets: TwitterAPIV2
    ) {}

    async execute(postId: string) {
        const post = await this.postUseCase.getById(postId);
        if (!post) {
            // eslint-disable-next-line quotes
            throw new ApplicationError("Post doesn't exist or has been deleted", 404);
        }
        if (Object.keys(post.actions).length === 0) {
            // eslint-disable-next-line quotes
            throw new ApplicationError("Post doesn't have any actions", 404);
        }
        const pt = new AnalyseTweet(post);
        const submissions = await this.submissionUseCase.getAllPostSubmissions(postId);
        const tweets = await this.fetchTweets.start(submissions);
        if (!tweets) return;
        const { success, failed } = tweets;
        for (const tweet of success) {
            if (tweet) {
                const points = tweet ? pt.calculate(tweet) : 0;
                if (points > 0) {
                    await this.userUseCase.updateUserPoints(tweet.id, points);
                }
            }
        }
    }
}
