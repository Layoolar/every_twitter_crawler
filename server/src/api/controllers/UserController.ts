import { Request, Response } from 'express';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UserPresenter } from '../presenter/UserPresenter';
import { User } from '../../domain/entities';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { Permission } from '../../domain/entities/User';
import { UserUseCase } from '../../application/useCases/UserUseCase';

export class UserController {
    constructor(
        private readonly userPresenter: UserPresenter,
        private readonly httpStatusCodes: HttpStatusCodes,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly userUseCase: UserUseCase
    ) {}

    async saveUser(req: Request, res: Response) {
        // Construct new user object
        const newUser: User = {
            id: this.uuidGenerator.generateId(),
            username: req.body.username,
            permission: Permission.USER,
            accumulatedXP: 0,
            email: '',
            location: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        await this.userUseCase.createUser(newUser);
        res.status(this.httpStatusCodes.StatusCodes.CREATED).json(
            this.userPresenter.present(req, this.httpStatusCodes.StatusCodes.CREATED)
        );
    }

    async getUser(req: Request, res: Response) {
        // get user by id
        const { id } = req.body;
        const data = await this.userUseCase.getById(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.userPresenter.present(req, this.httpStatusCodes.StatusCodes.OK, data)
        );
    }

    async deleteUser(req: Request, res: Response) {
        // Remove user by id
        const { id } = req.body;
        await this.userUseCase.deleteUser(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.userPresenter.present(req, this.httpStatusCodes.StatusCodes.OK)
        );
    }
}
