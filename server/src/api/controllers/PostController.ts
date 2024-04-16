import { Request, Response } from 'express';
import { PostUseCase } from '../../application/useCases/PostUseCase';
import { Post } from '../../domain/entities';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { PostPresenter } from '../presenter/PostPresenter';

export class PostController {
    constructor(
        private readonly postPresenter: PostPresenter,
        private readonly httpStatusCodes: HttpStatusCodes,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly postUseCase: PostUseCase
    ) {}

    async savePost(req: Request, res: Response) {
        const post: Post = {
            id: this.uuidGenerator.generateId(),
            url: req.body.url,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fullText: req.body.full_text ?? '',
            entities: req.body.entities,
            actions: req.body.actions
        };
        const data = await this.postUseCase.createPost(post);
        res.status(this.httpStatusCodes.StatusCodes.CREATED).json(
            this.postPresenter.present(req, this.httpStatusCodes.StatusCodes.CREATED, data)
        );
    }

    async getPost(req: Request, res: Response) {
        const { id } = req.body;
        const data = await this.postUseCase.getById(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.postPresenter.present(req, this.httpStatusCodes.StatusCodes.OK, data)
        );
    }

    async getAllPosts(req: Request, res: Response) {
        const data = await this.postUseCase.getAllPosts();
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.postPresenter.present(req, this.httpStatusCodes.StatusCodes.OK, data)
        );
    }

    async deletePost(req: Request, res: Response) {
        const { id } = req.body;
        await this.postUseCase.deletePost(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.postPresenter.present(req, this.httpStatusCodes.StatusCodes.OK)
        );
    }
}
