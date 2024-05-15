import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';

export class BasePresenter {
    constructor(private readonly httpStatusCodes: HttpStatusCodes) {}
    present(req: Request, statusCode: StatusCodes, data: unknown = null) {
        return { statusCode, statusMessage: this.httpStatusCodes.getReasonPhrase(statusCode), data };
    }
}
