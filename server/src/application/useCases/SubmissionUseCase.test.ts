import { DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { faker } from '@faker-js/faker';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { SubmissionType } from '../../domain/entities/Submission';
import dbClient from '../../infrastructure/data';
import { SubmissionRepositoryImpl } from '../../infrastructure/data/dynamoDB/SubmissionRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { SubmissionUseCase } from './SubmissionUseCase';

describe('SubmissionUseCase', () => {
    const tableName = 'jest_submission';
    const uuidGenerator = new UUIDGenerator();
    const httpStatusCodes = new HttpStatusCodes();
    const subDBImpl = new SubmissionRepositoryImpl(dbClient, tableName);
    subDBImpl.deleteTable = async (tableName: string) => {
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
    const subUseCase = new SubmissionUseCase(subDBImpl, httpStatusCodes);
    const mockNewSub = () => {
        const types: SubmissionType[] = [
            SubmissionType.COMMENT,
            SubmissionType.RETWEET,
            SubmissionType.POST,
            SubmissionType.COMMENT
        ];
        const subId = uuidGenerator.generateId();
        return {
            id: subId,
            url: faker.internet.url(),
            userId: uuidGenerator.generateId(),
            postId: uuidGenerator.generateId(),
            tweetId: uuidGenerator.generateId(),
            type: types[Math.floor(Math.random() * types.length)],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    };

    beforeAll(async () => {
        await subDBImpl.createTable(subDBImpl.params, tableName);
    }, 30000);

    afterAll(async () => {
        await subDBImpl.deleteTable(tableName);
    });

    test('saveSubmission successfully saves new Submission in DB', async () => {
        const newSub = mockNewSub();
        const data = await subUseCase.saveSubmisson(newSub);
        expect(data).toEqual(newSub);
    });

    test('getById successfully gets post by id', async () => {
        const newSub = mockNewSub();
        await subUseCase.saveSubmisson(newSub);
        const data = await subUseCase.getById(newSub.id);
        expect(data).toEqual(newSub);
    });

    test('getAllSubmissionsByUser4Post', async () => {
        const userId = uuidGenerator.generateId();
        const postId = uuidGenerator.generateId();
        const newSub1 = mockNewSub();
        newSub1.userId = userId;
        newSub1.postId = postId;
        await subUseCase.saveSubmisson(newSub1);
        const newSub2 = mockNewSub();
        newSub2.userId = userId;
        newSub2.postId = postId;
        await subUseCase.saveSubmisson(newSub2);
        const data = await subUseCase.getAllSubmissionsByUser4Post(userId, postId);
        expect(data.length).toBe(2);
        const [a, b] = data;
        expect(a.userId).toEqual(b.userId);
        expect(a.postId).toEqual(b.postId);
        expect(data.find((item) => item.id === newSub1.id)).toEqual(newSub1);
        expect(data.find((item) => item.id === newSub2.id)).toEqual(newSub2);
    });

    test('getAllSubmissionsByCriteria', async () => {
        const userId = uuidGenerator.generateId();
        const postId = uuidGenerator.generateId();
        const type = SubmissionType.QUOTE;
        const newSub1 = mockNewSub();
        newSub1.userId = userId;
        newSub1.postId = postId;
        newSub1.type = type;
        await subUseCase.saveSubmisson(newSub1);
        const newSub2 = mockNewSub();
        newSub2.userId = userId;
        newSub2.postId = postId;
        newSub2.type = type;
        await subUseCase.saveSubmisson(newSub2);
        const newSub3 = mockNewSub();
        newSub3.userId = userId;
        newSub3.postId = postId;
        newSub3.type = SubmissionType.COMMENT;
        await subUseCase.saveSubmisson(newSub3);
        const data = await subUseCase.getAllSubmissionsByCriteria(userId, postId, type);
        expect(data.length).toBe(2);
        const [a, b] = data;
        expect(a.userId).toEqual(b.userId);
        expect(a.postId).toEqual(b.postId);
        expect(a.type).toEqual(b.type);
        expect(a.id === b.id).toBe(false);
        const data2 = await subUseCase.getAllSubmissionsByCriteria(userId, postId, SubmissionType.COMMENT);
        expect(data2.length).toBe(1);
        const c = data2[0];
        expect(c).toEqual(newSub3);
        expect(c.type !== b.type).toBe(true);
    });

    test('getAllSubmissionsLast24', async () => {
        const postId = uuidGenerator.generateId();
        const type = SubmissionType.POST;
        const newSub1 = mockNewSub();
        newSub1.postId = postId;
        newSub1.type = type;
        newSub1.createdAt = new Date(new Date().getTime() - 25 * 60 * 60 * 1000).toISOString();
        await subUseCase.saveSubmisson(newSub1);
        const newSub2 = mockNewSub();
        newSub2.postId = postId;
        newSub2.type = type;
        await subUseCase.saveSubmisson(newSub2);
        const newSub3 = mockNewSub();
        newSub3.postId = postId;
        newSub3.type = type;
        await subUseCase.saveSubmisson(newSub3);
        const data = await subUseCase.getAllSubmissionsLast24(postId, type);
        expect(data.length).toBe(2);
        const [a, b] = data;
        expect(a.postId).toEqual(b.postId);
        expect(a.type).toEqual(b.type);
        expect(data.find((item) => item.id === newSub2.id)).toEqual(newSub2);
        expect(data.find((item) => item.id === newSub3.id)).toEqual(newSub3);
    });

    test('deleteAllSubmission', async () => {
        const postId = uuidGenerator.generateId();
        const newSub1 = mockNewSub();
        newSub1.postId = postId;
        await subUseCase.saveSubmisson(newSub1);
        const data1 = await subUseCase.getById(newSub1.id);
        const isDeleted = await subUseCase.deleteSubmission(newSub1.id);
        const data2 = await subUseCase.getById(newSub1.id);
        expect(data1).toEqual(newSub1);
        expect(isDeleted).toBe(true);
        expect(data2).toBe(null);
    });
});
