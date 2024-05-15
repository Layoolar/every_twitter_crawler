import { Request, Response } from 'express';
import { UserUseCase } from '../../application/useCases/UserUseCase';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { BasePresenter } from '../presenter';

export class UserController {
    constructor(
        private readonly presenter: BasePresenter,
        private readonly httpStatusCodes: HttpStatusCodes,
        private readonly userUseCase: UserUseCase
    ) {}

    async getUser(req: Request, res: Response) {
        const user = res.locals.user;
        res.status(this.httpStatusCodes.StatusCodes.OK).json(
            this.presenter.present(req, this.httpStatusCodes.StatusCodes.OK, user)
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
