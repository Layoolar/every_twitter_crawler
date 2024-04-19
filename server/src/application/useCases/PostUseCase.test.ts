// Import necessary dependencies
import { DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { faker } from '@faker-js/faker';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { PostAction } from '../../domain/entities/Post';
import dbClient from '../../infrastructure/data';
import { PostRepositoryImpl } from '../../infrastructure/data/dynamoDB/PostRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { PostUseCase } from './PostUseCase';

// Describe the test suite for PostUseCase
describe('PostUseCase', () => {
    // Define the table name, UUID generator, HTTP status codes, and PostRepositoryImpl instance
    const tableName = 'jest_post';
    const uuidGenerator = new UUIDGenerator();
    const httpStatusCodes = new HttpStatusCodes();
    const postDBImpl = new PostRepositoryImpl(dbClient, tableName);

    // Override the deleteTable method in PostRepositoryImpl to log the result
    postDBImpl.deleteTable = async (tableName: string) => {
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

    // Instantiate PostUseCase with the PostRepositoryImpl and HTTP status codes
    const postUseCase = new PostUseCase(postDBImpl, httpStatusCodes);

    // Define a function to generate a mock new post
    const mockNewPost = () => {
        const postId = uuidGenerator.generateId();
        return {
            id: postId,
            url: faker.internet.url(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fullText: '',
            entities: {
                cashtags: [
                    `${faker.finance.currency().symbol}${faker.finance.currency().code}`,
                    `${faker.finance.currency().symbol}${faker.finance.currency().code}`,
                    `${faker.finance.currency().symbol}${faker.finance.currency().code}`
                ],
                hashtags: [faker.color.rgb(), faker.color.rgb(), faker.color.rgb()],
                keywords: [faker.person.middleName(), faker.person.middleName(), faker.person.middleName()]
            },
            actions: {
                [PostAction.COMMENT]: 2,
                [PostAction.QUOTE]: 5
            }
        };
    };

    // Before all tests, create the table
    beforeAll(async () => {
        await postDBImpl.createTable(postDBImpl.params, tableName);
    }, 30000);

    // After all tests, delete the table
    afterAll(async () => {
        await postDBImpl.deleteTable(tableName);
    });

    // Test that savePost successfully creates a new post
    test('savePost successfully creates new post', async () => {
        const newPost = mockNewPost();
        const data = await postUseCase.createPost(newPost);
        expect(data).toEqual(newPost);
    });

    // Test that getById successfully gets a post by id
    test('getById successfully gets post by id', async () => {
        const newPost = mockNewPost();
        await postUseCase.createPost(newPost);
        const data = await postUseCase.getById(newPost.id);
        expect(data.id).toEqual(newPost.id);
        expect(data.url).toEqual(newPost.url);
    });

    // Test that getAllPosts returns all posts in the database
    test('get all posts in database', async () => {
        const allPosts = await postUseCase.getAllPosts();
        expect(typeof allPosts).toBe(typeof []);
        expect(allPosts.length > 0).toBe(true);
    });
});
