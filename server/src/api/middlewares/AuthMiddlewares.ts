import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '../../application/errors';
import CONFIG from '../../config/config';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB/UserRepositoryImpl';
import jwt from 'jsonwebtoken';
import { Permission } from '../../domain/entities/User';

export class Middleware {
    constructor(private readonly userDBImpl: UserRepositoryImpl) {}

    async isAuthenticated(req: Request, res: Response, next: NextFunction) {
        const unauthorized = StatusCodes.UNAUTHORIZED;
        let token: string | undefined = undefined;

        if (req.headers?.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) throw new ApplicationError('You are not logged in!', unauthorized);

        const JWT_SECRET = CONFIG.JWT_TOKEN_SECRET;
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) throw new ApplicationError('Invalid token', unauthorized);
        const user = await this.userDBImpl.getById(String(decoded.sub));
        if (!user) throw new ApplicationError('User with that token no longer exists', unauthorized);

        res.locals.user = user;
        next();
    }

    async requireUser(req: Request, res: Response, next: NextFunction) {
        const unauthorized = StatusCodes.UNAUTHORIZED;
        const user = res.locals.user;
        if (!user) throw new ApplicationError('Invalid token or session has expired', unauthorized);
        next();
    }

    async requireAdmin(req: Request, res: Response, next: NextFunction) {
        const forbidden = StatusCodes.FORBIDDEN;
        const user = await this.userDBImpl.getById(res.locals.user);
        if (user?.permission !== Permission.ADMIN) throw new ApplicationError('Forbidden!', forbidden);
        next();
    }
}
