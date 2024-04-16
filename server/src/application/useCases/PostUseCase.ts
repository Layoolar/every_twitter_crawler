import { Post } from '../../domain/entities';
import { PostRepositoryImpl } from '../../infrastructure/data/dynamoDB/PostRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { ApplicationError } from '../errors/ApplicationError';

export class PostUseCase {
    constructor(
        private readonly postDBImpl: PostRepositoryImpl,
        private readonly httpStatusCodes: HttpStatusCodes
    ) {}

    async createPost(post: Post) {
        if (!post.id)
            throw new ApplicationError('post id must be provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        if (!post.url)
            throw new ApplicationError('post url must be provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        if (!post.actions)
            throw new ApplicationError('post actions must be provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        if (!post.entities)
            throw new ApplicationError(
                // eslint-disable-next-line quotes
                "post entities must be provided, users won't get awarded points if it is not provided",
                this.httpStatusCodes.StatusCodes.BAD_REQUEST
            );
        return this.postDBImpl.createPost(post);
    }

    async deletePost(id: string) {
        if (!id) {
            throw new ApplicationError('id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        return this.postDBImpl.deletePost(id);
    }

    async getById(id: string) {
        if (!id) {
            throw new ApplicationError('post id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        const output = await this.postDBImpl.getById(id);
        if (output) return output;
        throw new ApplicationError('post data not found', this.httpStatusCodes.StatusCodes.NOT_FOUND);
    }

    async getAllPosts() {
        return this.postDBImpl.getAllPosts();
    }
}
