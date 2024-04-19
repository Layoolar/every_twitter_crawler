import { Submission } from '../../domain/entities';
import { SubmissionType } from '../../domain/entities/Submission';
import { SubmissionRepositoryImpl } from '../../infrastructure/data/dynamoDB/SubmissionRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { ApplicationError } from '../errors/ApplicationError';

export class SubmissionUseCase {
    constructor(
        private readonly subDBImpl: SubmissionRepositoryImpl,
        private readonly httpStatusCodes: HttpStatusCodes
    ) {}

    async saveSubmisson(sub: Submission) {
        const errCode = this.httpStatusCodes.StatusCodes.BAD_REQUEST;
        if (!sub.postId) {
            throw new ApplicationError('Post ID must be provided for the submission.', errCode);
        }
        if (!sub.userId) {
            throw new ApplicationError('User ID must be provided for the submission.', errCode);
        }
        if (!sub.url) {
            throw new ApplicationError('URL must be provided for the submission.', errCode);
        }
        if (!sub.type) {
            throw new ApplicationError(
                'Submission type must be specified (e.g., retweet, post, comment, like).',
                errCode
            );
        }
        return this.subDBImpl.createSubmission(sub);
    }

    async getById(id: string) {
        if (!id) {
            throw new ApplicationError('Submission ID must be provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        return this.subDBImpl.getById(id);
    }

    async getAllSubmissionsByUser4Post(userId: string, postId: string) {
        const errCode = this.httpStatusCodes.StatusCodes.BAD_REQUEST;
        if (!userId) {
            throw new ApplicationError('User ID must be provided for the submission', errCode);
        }
        if (!postId) {
            throw new ApplicationError('Post ID must be provided for the submission', errCode);
        }
        return this.subDBImpl.getAllSubmissionsByUser4Post(userId, postId);
    }

    async getAllSubmissionsByCriteria(userId: string, postId: string, type: SubmissionType) {
        const errCode = this.httpStatusCodes.StatusCodes.BAD_REQUEST;
        if (!userId) {
            throw new ApplicationError('User ID must be provided for the submission', errCode);
        }
        if (!postId) {
            throw new ApplicationError('Post ID must be provided for the submission', errCode);
        }
        if (!type) {
            throw new ApplicationError('Submission Type must be provided', errCode);
        }
        return this.subDBImpl.getAllSubmissionsByCriteria(userId, postId, type);
    }

    async getAllSubmissionsLast24(postId: string, type: SubmissionType) {
        const errCode = this.httpStatusCodes.StatusCodes.BAD_REQUEST;
        if (!postId) {
            throw new ApplicationError('Post ID must be provided for the submission', errCode);
        }
        if (!type) {
            throw new ApplicationError('Submission Type must be provided', errCode);
        }
        return this.subDBImpl.getAllSubmissionsLast24(postId, type);
    }

    async getAllPostSubmissions(postId: string) {
        const errCode = this.httpStatusCodes.StatusCodes.BAD_REQUEST;
        if (!postId) {
            throw new ApplicationError('Post ID must be provided for the submission', errCode);
        }
        return this.subDBImpl.getAllPostSubmissions(postId);
    }

    async deleteSubmission(id: string) {
        if (!id) {
            throw new ApplicationError('Submission ID must be provided.', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        return this.subDBImpl.deleteSubmission(id);
    }
}
