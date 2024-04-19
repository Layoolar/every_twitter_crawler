import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';

export class BasePresenter {
    constructor(private readonly httpStatusCodes: HttpStatusCodes) {}
    present(req: Request, statusCode: StatusCodes, data: unknown = null) {
        const resBody = {
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            url: req.originalUrl,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        };
        return { statusCode, statusMessage: this.httpStatusCodes.getReasonPhase(statusCode), request: resBody, data };
    }
}
