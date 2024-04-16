import { describe, expect, test } from '@jest/globals';
import { PostUseCase } from './PostUseCase';
import dbClient from '../../infrastructure/data/DynamoDBClient';
import { PostRepositoryImpl } from '../../infrastructure/data/dynamoDB/PostRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { faker } from '@faker-js/faker';
import { PostAction } from '../../domain/entities/Post';

describe('PostUseCase', () => {
    const genPostIds: string[] = [];
    const postDBImpl = new PostRepositoryImpl(dbClient);
    const uuidGenerator = new UUIDGenerator();
    const httpStatusCodes = new HttpStatusCodes();
    const postUseCase = new PostUseCase(postDBImpl, httpStatusCodes);
    const mockNewPost = () => {
        const postId = uuidGenerator.generateId();
        genPostIds.push(postId);
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
                [PostAction.COMMENT]: 5,
                [PostAction.LIKE]: 2
            }
        };
    };

    afterAll(async () => {
        console.log(genPostIds);
        for (const item_id in genPostIds) {
            await postUseCase.deletePost(item_id);
        }
    });

    test('createPost successfully creates new post', async () => {
        const newPost = mockNewPost();
        const data = await postUseCase.createPost(newPost);
        expect(data).toEqual(newPost);
    });

    test('getById successfully gets post by id', async () => {
        const newPost = mockNewPost();
        await postUseCase.createPost(newPost);
        const data = await postUseCase.getById(newPost.id);
        console.log(data);
        expect(data.id).toEqual(newPost.id);
        expect(data.url).toEqual(newPost.url);
    });

    test('get all posts in database', async () => {
        const allPosts = await postUseCase.getAllPosts();
        expect(typeof allPosts).toBe(typeof []);
    });
});
