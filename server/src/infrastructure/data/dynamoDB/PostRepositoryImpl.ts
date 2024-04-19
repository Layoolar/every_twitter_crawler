import {
    AttributeDefinition,
    AttributeValue,
    DeleteItemCommand,
    DynamoDB,
    GetItemCommand,
    KeySchemaElement,
    PutItemCommand,
    ScalarAttributeType,
    ScanCommand
} from '@aws-sdk/client-dynamodb';
import { Post } from '../../../domain/entities';
import { PostEntities } from '../../../domain/entities/Post';
import { PostRepository } from '../../../domain/repositories';
import { Base, TableParams } from './Base';

/**
 * Represents a repository for managing posts in DynamoDB.
 * @extends Base
 * @implements PostRepository
 */
export class PostRepositoryImpl extends Base implements PostRepository {
    params: TableParams;
    tableName: string;
    /**
     * Creates an instance of PostRepositoryImpl.
     * @param {DynamoDB} dbClient - The DynamoDB client used for database operations.
     */
    constructor(dbClient: DynamoDB, tableName = 'Post') {
        super(dbClient);
        // Define table parameters and create the table
        this.tableName = tableName;
        this.params = {
            TableName: tableName,
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S' as ScalarAttributeType
                } as AttributeDefinition
            ],
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                } as KeySchemaElement
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
    }

    /**
     * Retrieves a post from DynamoDB by its ID.
     * @param {string} id - The ID of the post to retrieve.
     * @returns {Promise<Post | null>} A promise that resolves with the retrieved post.
     */
    async getById(id: string): Promise<Post | null> {
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: id }
            }
        };
        const getItemCommand = new GetItemCommand(params);
        const output = await this.dbClient.send(getItemCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Item) {
            const convertedItem = Base.convertItemData(output.Item) as unknown as Post;
            return convertedItem;
        }
        return null;
    }

    /**
     * Retrieves all posts from DynamoDB.
     * @returns {Promise<Post[]>} A promise that resolves with all posts.
     */
    async getAllPosts(): Promise<Post[]> {
        const params = {
            TableName: this.tableName
        };
        const scanItemsCommand = new ScanCommand(params);
        const output = await this.dbClient.send(scanItemsCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Items) {
            const convertedItemsList = [];
            for (const item of output.Items) {
                const convertedItem: Post = Base.convertItemData(item) as unknown as Post;
                convertedItemsList.push(convertedItem);
            }
            return convertedItemsList;
        }
        return [] as Post[];
    }

    /**
     * Creates a new post in DynamoDB.
     * @param {Post} post - The post object to create.
     * @returns {Promise<Post | null>} A promise that resolves when the post is created.
     */
    async createPost(post: Post): Promise<Post | null> {
        const params = {
            TableName: this.tableName,
            Item: {
                id: { S: post.id },
                url: { S: post.url },
                fullText: { S: post.fullText },
                entities: {
                    M: {
                        [PostEntities.CASHTAGS]: post.entities?.cashtags ? { SS: post.entities.cashtags } : { L: [] },
                        [PostEntities.HASHTAGS]: post.entities?.hashtags ? { SS: post.entities.hashtags } : { L: [] },
                        [PostEntities.KEYWORDS]: post.entities?.keywords ? { SS: post.entities.keywords } : { L: [] },
                        [PostEntities.MENTIONS]: post.entities?.keywords ? { SS: post.entities.keywords } : { L: [] }
                    }
                },
                actions: {
                    M: Object.entries(post.actions).reduce((acc: Record<string, AttributeValue>, [action, value]) => {
                        acc[action] = { N: value.toString() };
                        return acc;
                    }, {})
                }
            }
        };
        const putCommand = new PutItemCommand(params);
        const output = await this.dbClient.send(putCommand);
        if (output.$metadata.httpStatusCode === 200) return post;
        return null;
    }

    /**
     * Updates an existing post in DynamoDB.
     * @param {Post} post - The updated post object.
     * @returns {Promise<Post | null>} A promise that resolves when the post is updated.
     */
    async updatePost(post: Post): Promise<Post | null> {
        console.log(post);
        return {} as Post;
    }

    /**
     * Deletes a post from DynamoDB by its ID.
     * @param {string} id - The ID of the post to delete.
     * @returns {Promise<boolean>} A promise that resolves when the post is deleted.
     */
    async deletePost(id: string): Promise<boolean> {
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: id }
            }
        };
        const deleteCommand = new DeleteItemCommand(params);
        const output = await this.dbClient.send(deleteCommand);
        if (output.$metadata.httpStatusCode === 200) return true;
        return false;
    }
}
