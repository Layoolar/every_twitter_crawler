import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../application/errors/NotFoundError';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    const error = new NotFoundError(`Path '${req.originalUrl}' not found`);
    next(error);
}