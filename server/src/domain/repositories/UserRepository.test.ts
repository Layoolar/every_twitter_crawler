import { UserRepository } from './UserRepository';
import { Permission, User } from '../entities/User';
import {
    DeleteItemCommandOutput,
    GetItemCommandOutput,
    PutItemCommandOutput,
    UpdateItemCommandOutput
} from '@aws-sdk/client-dynamodb';
import { describe, beforeEach, expect, test } from '@jest/globals';

class MockUserRepository implements UserRepository {
    users: Map<string, User>;

    constructor() {
        this.users = new Map();
    }

    async findById(id: string): Promise<GetItemCommandOutput | null> {
        const user = this.users.get(id);
        // @ts-expect-error: for simple test data
        return user ? { Item: user } : null;
    }

    async createUser(user: User): Promise<PutItemCommandOutput> {
        this.users.set(user.id, user);
        return {} as PutItemCommandOutput; // Dummy response
    }

    async updateUser(user: User): Promise<UpdateItemCommandOutput> {
        if (this.users.has(user.id)) {
            this.users.set(user.id, user);
            return {} as UpdateItemCommandOutput; // Dummy response
        } else {
            throw new Error('User not found');
        }
    }

    async deleteUser(id: string): Promise<DeleteItemCommandOutput> {
        if (this.users.has(id)) {
            this.users.delete(id);
            return {} as DeleteItemCommandOutput; // Dummy response
        } else {
            throw new Error('User not found');
        }
    }
}

describe('MockUserRepository', () => {
    let userRepository: MockUserRepository;

    beforeEach(() => {
        userRepository = new MockUserRepository();
    });

    test('findById - should return user if found', async () => {
        // Arrange
        const user: User = {
            id: '123',
            username: 'testuser',
            permission: Permission.USER,
            accumulatedXP: 0,
            email: 'test@example.com',
            location: 'Test Location',
            createdAt: '2024-04-10T12:00:00Z',
            updatedAt: '2024-04-10T12:00:00Z'
        };
        userRepository.users.set(user.id, user);

        // Act
        const result = await userRepository.findById('123');

        // Assert
        expect(result).toEqual({ Item: user });
    });

    test('findById - should return null if user not found', async () => {
        // Act
        const result = await userRepository.findById('123');

        // Assert
        expect(result).toBeNull();
    });

    // Similar tests can be written for other methods (createUser, updateUser, deleteUser)
});
