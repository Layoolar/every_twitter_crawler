import { Request, Response } from 'express';
import { PostUseCase } from '../../application/useCases/PostUseCase';
import { Post } from '../../domain/entities';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { BasePresenter } from '../presenter';

export class PostController {
    constructor(
        private readonly presenter: BasePresenter,
        private readonly httpStatusCodes: HttpStatusCodes,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly postUseCase: PostUseCase
    ) {}

    async savePost(req: Request, res: Response) {
        const post: Post = {
            id: this.uuidGenerator.generateId(),
            admin_id: req.body.admin_id,
            url: req.body.url,
            title: req.body.title,
            description: req.body.description,
            endTime: req.body.endTime,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            text: req.body.full_text ?? '',
            entities: req.body.entities,
            actions: req.body.actions
        };
        const data = await this.postUseCase.createPost(post);
        res.status(this.httpStatusCodes.StatusCodes.CREATED).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.CREATED, data)
        );
    }

    async getPost(req: Request, res: Response) {
        const { id } = req.body;
        const data = await this.postUseCase.getById(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK, data)
        );
    }

    async getAllPosts(req: Request, res: Response) {
        const data = await this.postUseCase.getAllPosts();
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK, { count: data.length, data })
        );
    }

    async deletePost(req: Request, res: Response) {
        const { id } = req.body;
        await this.postUseCase.deletePost(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK)
        );
    }
}
