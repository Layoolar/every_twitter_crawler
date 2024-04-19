import { Request, Response } from 'express';
import { SubmissionUseCase } from '../../application/useCases/SubmissionUseCase';
import { Submission } from '../../domain/entities';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { BasePresenter } from '../presenter';

export class SubmissionController {
    constructor(
        private readonly presenter: BasePresenter,
        private readonly httpStatusCodes: HttpStatusCodes,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly submissionUseCase: SubmissionUseCase
    ) {}

    async saveSubmission(req: Request, res: Response) {
        const submission: Submission = {
            id: this.uuidGenerator.generateId(),
            userId: req.body.userId,
            postId: req.body.postId,
            tweetId: req.body.tweetId,
            url: req.body.url,
            type: req.body.type,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const data = await this.submissionUseCase.saveSubmisson(submission);
        res.status(this.httpStatusCodes.StatusCodes.CREATED).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.CREATED, data)
        );
    }

    async getSubmission(req: Request, res: Response) {
        const { id } = req.body;
        const data = await this.submissionUseCase.getById(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK, data)
        );
    }

    async getAllSubmissions(req: Request, res: Response) {
        const data = await this.submissionUseCase.getAllSubmissionsLast24(req.body.postId, req.body.type);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK, { count: data.length, data })
        );
    }

    async deleteSubmission(req: Request, res: Response) {
        const { id } = req.body;
        await this.submissionUseCase.deleteSubmission(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK)
        );
    }
}
