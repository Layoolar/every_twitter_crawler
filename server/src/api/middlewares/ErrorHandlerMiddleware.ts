import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../../application/errors/ApplicationError';
import { NotFoundError } from '../../application/errors';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';

export class ErrorHandlerMiddleware {
    constructor(private readonly httpStatusCodes: HttpStatusCodes) {
        this.httpStatusCodes = httpStatusCodes;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catchAllHandler(err: Error, req: Request, res: Response, _: NextFunction) {
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
        console.log(err);
        if (err instanceof ApplicationError) {
            const { message, statusCode, data } = err;
            if (message === 'Error fetching tweets') {
                //TODO Log error to file
            }
            const responsePhrase = this.httpStatusCodes.getReasonPhrase(statusCode);
            return res
                .status(statusCode)
                .json({ statusCode, statusMessage: responsePhrase, request: resBody, error: { message, data } });
        }

        // TODO log error here
        const responseCode = this.httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
        const responsePhrase = this.httpStatusCodes.getReasonPhrase(responseCode);
        return res.status(responseCode).json({
            status: responseCode,
            statusMessage: responsePhrase,
            request: resBody,
            error: { message: responsePhrase }
        });
    }

    notFoundHandler(req: Request, res: Response, next: NextFunction) {
        const error = new NotFoundError(`Path '${req.originalUrl}' not found`);
        next(error);
    }
}
