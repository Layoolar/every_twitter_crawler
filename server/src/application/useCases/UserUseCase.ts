import { User } from '../../domain/entities';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB/UserRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { ApplicationError } from '../errors/ApplicationError';

export class UserUseCase {
    constructor(
        private readonly userDBImpl: UserRepositoryImpl,
        private readonly httpStatusCodes: HttpStatusCodes
    ) {}

    async saveUser(user: User) {
        return this.userDBImpl.createUser(user);
    }

    async deleteUser(id?: string) {
        if (!id) {
            throw new ApplicationError('id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        return this.userDBImpl.deleteUser(id);
    }

    async updateUserPoints(id: string, newPoints: number) {
        return this.userDBImpl.updateUserPoints(id, newPoints);
    }

    async getById(id?: string) {
        if (!id) {
            throw new ApplicationError('user id not provided', this.httpStatusCodes.StatusCodes.BAD_REQUEST);
        }
        const output = await this.userDBImpl.getById(id);
        if (output) return output;
        throw new ApplicationError('user data not found', this.httpStatusCodes.StatusCodes.NOT_FOUND);
    }
}
