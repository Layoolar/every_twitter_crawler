import { Post } from '../../domain/entities';
import { PostRepositoryImpl } from '../../infrastructure/data/dynamoDB/PostRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { ApplicationError } from '../errors/ApplicationError';

/**
 * This class contains all use cases related to 'Post'.
 */
export class PostUseCase {
    /**
     * @param postDBImpl A post repository implementation instance which will be used to interact with the data source.
     * @param httpStatusCodes A HTTP status codes instance to get the HTTP status code constants.
     */
    constructor(
        private readonly postDBImpl: PostRepositoryImpl,
        private readonly httpStatusCodes: HttpStatusCodes
    ) {}

    /**
     * Creates a new post.
     * @param post The 'Post' object which needs to be created.
     * @throws {ApplicationError} Throws an error if the 'Post' object doesn't contain 'id', 'url', 'actions' or 'entities'.
     */
    async createPost(post: Post) {
        const code = this.httpStatusCodes.StatusCodes.BAD_REQUEST;
        if (!post.title) throw new ApplicationError('post title must be provided', code);
        if (!post.id) throw new ApplicationError('post id must be provided', code);
        if (!post.url) throw new ApplicationError('post url must be provided', code);
        if (!post.actions) throw new ApplicationError('post actions must be provided', code);
        if (!post.entities)
            throw new ApplicationError(
                // eslint-disable-next-line quotes
                "post entities must be provided, users won't get awarded points if it is not provided",
                code
            );
        post.entities = {
            cashtags: post.entities.cashtags ? [...new Set(post.entities.cashtags)] : undefined,
            hashtags: post.entities.hashtags ? [...new Set(post.entities.hashtags)] : undefined,
            keywords: post.entities.keywords ? [...new Set(post.entities.keywords)] : undefined,
            mentions: post.entities.mentions ? [...new Set(post.entities.mentions)] : undefined
        };
        // TODO handle endTime later
        return this.postDBImpl.createPost(post);
    }

    /**
     * Deletes a post by its id.
     * @param id The id of the post which needs to be deleted.
     * @throws {ApplicationError} Throws an error if the 'id' is not provided.
     */
    async deletePost(id: string) {
        if (!id) {
            throw new ApplicationError('id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        return this.postDBImpl.deletePost(id);
    }

    /**
     * Returns a post by its id.
     * @param id The id of the post which needs to be returned.
     * @throws {ApplicationError} Throws an error if the 'id' is not provided or the post data is not found.
     */
    async getById(id: string) {
        if (!id) {
            throw new ApplicationError('post id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        const output = await this.postDBImpl.getById(id);
        if (output) return output;
        throw new ApplicationError('post data not found', this.httpStatusCodes.StatusCodes.NOT_FOUND);
    }

    /**
     * Returns all posts.
     */
    async getAllPosts() {
        return this.postDBImpl.getAllPosts();
    }
}
