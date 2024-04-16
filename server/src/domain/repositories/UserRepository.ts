import { DeleteItemCommandOutput, PutItemCommandOutput, UpdateItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { User } from '../entities/User';

export interface UserRepository {
    getById(id: string): Promise<User | null>;
    createUser(user: User): Promise<PutItemCommandOutput>;
    updateUser(user: User): Promise<UpdateItemCommandOutput>;
    deleteUser(id: string): Promise<DeleteItemCommandOutput>;
}
