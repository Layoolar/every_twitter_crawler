import { User } from '../entities/User';

export interface UserRepository {
    getById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User | null>;
    updateUserPoints(id: string, newPoints: number): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
}
