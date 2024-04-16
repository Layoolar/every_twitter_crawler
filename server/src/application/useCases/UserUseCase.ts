import { User } from '../../domain/entities';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB/UserRepositoryImpl.ts';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { ApplicationError } from '../errors/ApplicationError';

export class UserUseCase {
    constructor(
        private readonly userDBImpl: UserRepositoryImpl,
        private readonly httpStatusCodes: HttpStatusCodes
    ) {}

    async createUser(user: User) {
        if (!user.username || !user.id) {
            throw new ApplicationError('username must be provided', 400);
        }
        await this.userDBImpl.createUser(user);
    }

    async deleteUser(id: string) {
        if (!id) {
            throw new ApplicationError('id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        await this.userDBImpl.deleteUser(id);
    }

    async getById(id: string) {
        if (!id) {
            throw new ApplicationError('user id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        const output = await this.userDBImpl.getById(id);
        if (output) return output;
        throw new ApplicationError('user data not found', this.httpStatusCodes.StatusCodes.NOT_FOUND);
    }
}
