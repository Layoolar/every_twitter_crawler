import { DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import dbClient from '../../infrastructure/data';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { UserUseCase } from './UserUseCase';
import { User } from '../../domain/entities';
import { faker } from '@faker-js/faker';
import { Permission } from '../../domain/entities/User';
import { ApplicationError } from '../errors/ApplicationError';
import { httpStatusCodes } from '../../infrastructure/external';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB/UserRepositoryImpl';

describe('UserUserCase', () => {
    const tableName = 'jest_user';
    const uuidGenerator = new UUIDGenerator();
    const userDBImpl = new UserRepositoryImpl(dbClient, tableName);
    userDBImpl.deleteTable = async (tableName: string) => {
        try {
            const params = {
                TableName: tableName
            };
            const deleteTableCommand = new DeleteTableCommand(params);
            await dbClient.send(deleteTableCommand);
            console.log(`Table "${tableName}" deleted successfully:`);
        } catch (error) {
            console.error('Error deleting table:', error);
        }
        return tableName;
    };
    const userUseCase = new UserUseCase(userDBImpl, httpStatusCodes);
    const mockNewUser = (): User => {
        const postId = uuidGenerator.generateId();
        return {
            id: postId,
            email: faker.internet.email(),
            permission: Permission.USER,
            xp: {
                totalxp: 0,
                claimed: 0,
                unclaimed: 0
            },
            createdAt: faker.date.anytime().toISOString(),
            updatedAt: faker.date.anytime().toISOString()
        };
    };

    beforeAll(async () => {
        await userDBImpl.createTable(userDBImpl.params, tableName);
    }, 30000);

    afterAll(async () => {
        await userDBImpl.deleteTable(tableName);
    }, 30000);

    test('saveUser should save new user', async () => {
        const newUser = mockNewUser();
        const savedUser = await userUseCase.saveUser(newUser);
        expect(savedUser).toBeDefined();
        expect(savedUser?.id).toBeDefined();
        expect(savedUser?.id).toBe(newUser.id);
        const user = await userUseCase.getById(newUser.id);
        expect(user).toBeDefined();
        expect(user?.id).toBeDefined();
        expect(user?.id).toBe(newUser.id);
    });

    test('getById should get existing user', async () => {
        const newUser = mockNewUser();
        newUser.twitter = null;
        newUser.telegram = null;
        await userUseCase.saveUser(newUser);
        const user = await userUseCase.getById(newUser.id);
        expect(user).toBeDefined();
        expect(user).toEqual(newUser);
    });

    test('deleteUser should delete user from db', async () => {
        const newUser = mockNewUser();
        const savedUser = await userUseCase.saveUser(newUser);
        expect(savedUser).toBeDefined();
        const user = await userUseCase.getById(newUser.id);
        expect(user).toBeDefined();
        expect(user?.id).toBeDefined();
        expect(user?.id).toBe(newUser.id);
        const deletedUser = await userUseCase.deleteUser(newUser.id);
        expect(deletedUser).toBe(true);
    });

    test('getById should throw ApplicationError when id is not provided', async () => {
        await expect(userUseCase.getById()).rejects.toThrow(ApplicationError);
    });

    test('getById should throw ApplicationError when user data is not found', async () => {
        const mockId = 'some-valid-id';
        await expect(userUseCase.getById(mockId)).rejects.toThrow(ApplicationError);
    });

    test('updateUserPoints should correctly update users points', async () => {
        const newUser = mockNewUser();
        newUser.xp.totalxp = 12;
        newUser.xp.unclaimed = 12;
        await userUseCase.saveUser(newUser);
        const user = await userUseCase.getById(newUser.id);
        expect(user).toBeDefined();
        expect(user?.id).toBeDefined();
        expect(user?.id).toBe(newUser.id);
        const updatedUser = await userUseCase.updateUserPoints(newUser.id, 5);
        expect(updatedUser).toBe(true);
        const getUpdatedUser = await userUseCase.getById(newUser.id);
        expect(getUpdatedUser).toBeDefined();
        expect(getUpdatedUser?.id).toBeDefined();
        expect(getUpdatedUser?.id).toBe(newUser.id);
        expect(getUpdatedUser.xp.totalxp).toEqual(17);
        expect(getUpdatedUser.xp.unclaimed).toEqual(17);
    });
});
