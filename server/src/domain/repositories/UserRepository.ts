import {
    DeleteItemCommandOutput,
    GetItemCommandOutput,
    PutItemCommandOutput,
    UpdateItemCommandOutput
} from '@aws-sdk/client-dynamodb';
import { User } from '../entities/User';

export interface UserRepository {
    findById(id: string): Promise<GetItemCommandOutput | null>;
    createUser(user: User): Promise<PutItemCommandOutput>;
    updateUser(user: User): Promise<UpdateItemCommandOutput>;
    deleteUser(id: string): Promise<DeleteItemCommandOutput>;
}
