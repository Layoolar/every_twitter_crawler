import { Request, Response } from 'express';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { User } from '../../domain/entities';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { Permission } from '../../domain/entities/User';
import { UserUseCase } from '../../application/useCases/UserUseCase';
import { BasePresenter } from '../presenter';

export class UserController {
    constructor(
        private readonly presenter: BasePresenter,
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
        const data = await this.userUseCase.saveUser(newUser);
        res.status(this.httpStatusCodes.StatusCodes.CREATED).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.CREATED, data)
        );
    }

    async getUser(req: Request, res: Response) {
        // get user by id
        const { id } = req.body;
        const data = await this.userUseCase.getById(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK, data)
        );
    }

    async deleteUser(req: Request, res: Response) {
        // Remove user by id
        const { id } = req.body;
        await this.userUseCase.deleteUser(id);
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK)
        );
    }
}
