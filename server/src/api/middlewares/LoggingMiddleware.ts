import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware {
    requestLogger(req: Request, res: Response, next: NextFunction) {
        const reqBody = {
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
        console.log('req: ', reqBody, '\n');
        console.log('sessionID: ', req.sessionID, '\n');
        console.log('session: ', req.session, '\n');
        console.log('cookies: ', req.cookies, '\n');
        next();
    }
}
