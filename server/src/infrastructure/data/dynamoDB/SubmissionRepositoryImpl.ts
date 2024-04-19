/**
 * Represents a repository for managing submissions in DynamoDB.
 * Extends the Base class and implements the SubmissionRepository interface.
 */
import {
    AttributeDefinition,
    DeleteItemCommand,
    DynamoDB,
    GetItemCommand,
    KeySchemaElement,
    PutItemCommand,
    ScalarAttributeType,
    ScanCommand
} from '@aws-sdk/client-dynamodb';
import { Submission } from '../../../domain/entities';
import { SubmissionType } from '../../../domain/entities/Submission';
import { SubmissionRepository } from '../../../domain/repositories';
import { Base, TableParams } from './Base';

/**
 * Represents a repository for managing submissions in DynamoDB.
 * @extends Base
 * @implements SubmissionRepository
 */
export class SubmissionRepositoryImpl extends Base implements SubmissionRepository {
    params: TableParams;
    tableName: string;
    /**
     * Creates an instance of SubmissionRepositoryImpl.
     * @param {DynamoDB} dbClient - The DynamoDB client used for database operations.
     */
    constructor(dbClient: DynamoDB, tableName = 'Submission') {
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
     * Retrieves a submission from DynamoDB by its ID.
     * @param {string} id - The ID of the submission to retrieve.
     * @returns {Promise<Submission | null>} A promise that resolves with the retrieved submission.
     */
    async getById(id: string): Promise<Submission | null> {
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: id }
            }
        };
        const getItemCommand = new GetItemCommand(params);
        const output = await this.dbClient.send(getItemCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Item) {
            const convertedItem = Base.convertItemData(output.Item) as unknown as Submission;
            return convertedItem;
        }
        return null;
    }

    /**
     * Retrieves all submissions by user for a post from DynamoDB.
     * @returns {Promise<Submission[]>} A promise that resolves with all submissions.
     */
    async getAllSubmissionsByUser4Post(userId: string, postId: string): Promise<Submission[]> {
        const params = {
            TableName: this.tableName,
            FilterExpression: '#userId = :userId AND #postId = :postId',
            ExpressionAttributeNames: {
                '#userId': 'userId',
                '#postId': 'postId'
            },
            ExpressionAttributeValues: {
                ':userId': { S: userId },
                ':postId': { S: postId }
            }
        };

        const scanItemsCommand = new ScanCommand(params);
        const output = await this.dbClient.send(scanItemsCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Items) {
            const convertedItemsList = [];
            for (const item of output.Items) {
                const convertedItem: Submission = Base.convertItemData(item) as unknown as Submission;
                convertedItemsList.push(convertedItem);
            }
            return convertedItemsList;
        }
        return [] as Submission[];
    }

    /**
     *
     */
    async getAllPostSubmissions(postId: string) {
        const params = {
            TableName: this.tableName,
            FilterExpression: '#postId = :postId',
            ExpressionAttributeNames: {
                '#postId': 'postId'
            },
            ExpressionAttributeValues: {
                ':postId': { S: postId }
            }
        };

        const scanItemsCommand = new ScanCommand(params);
        const output = await this.dbClient.send(scanItemsCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Items) {
            const convertedItemsList = [];
            for (const item of output.Items) {
                const convertedItem: Submission = Base.convertItemData(item) as unknown as Submission;
                convertedItemsList.push(convertedItem);
            }
            return convertedItemsList;
        }
        return [] as Submission[];
    }

    /**
     * Retrieves all submissions by user for a post with post type from DynamoDB.
     * @returns {Promise<Submission[]>} A promise that resolves with all submissions.
     */
    async getAllSubmissionsByCriteria(userId: string, postId: string, type: SubmissionType): Promise<Submission[]> {
        const params = {
            TableName: this.tableName,
            FilterExpression: '#userId = :userId AND #postId = :postId AND #type = :type',
            ExpressionAttributeNames: {
                '#userId': 'userId',
                '#postId': 'postId',
                '#type': 'type'
            },
            ExpressionAttributeValues: {
                ':userId': { S: userId },
                ':postId': { S: postId },
                ':type': { S: type }
            }
        };

        const scanItemsCommand = new ScanCommand(params);
        const output = await this.dbClient.send(scanItemsCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Items) {
            const convertedItemsList = [];
            for (const item of output.Items) {
                const convertedItem: Submission = Base.convertItemData(item) as unknown as Submission;
                convertedItemsList.push(convertedItem);
            }
            return convertedItemsList;
        }
        return [] as Submission[];
    }

    /**
     * Retrieves all submissions for post in the last 24 hours from DynamoDB.
     * @returns {Promise<Submission[]>} A promise that resolves with all submissions.
     */
    async getAllSubmissionsLast24(postId: string, type: SubmissionType): Promise<Submission[]> {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

        const params = {
            TableName: this.tableName,
            FilterExpression: '#postId = :postId AND #type = :type AND #createdAt > :twentyFourHoursAgo',
            ExpressionAttributeNames: {
                '#postId': 'postId',
                '#type': 'type',
                '#createdAt': 'createdAt'
            },
            ExpressionAttributeValues: {
                ':postId': { S: postId },
                ':type': { S: type },
                ':twentyFourHoursAgo': { S: twentyFourHoursAgo.toISOString() }
            }
        };

        const scanItemsCommand = new ScanCommand(params);
        const output = await this.dbClient.send(scanItemsCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Items) {
            const convertedItemsList = [];
            for (const item of output.Items) {
                const convertedItem: Submission = Base.convertItemData(item) as unknown as Submission;
                convertedItemsList.push(convertedItem);
            }
            return convertedItemsList;
        }
        return [] as Submission[];
    }

    /**
     * Creates a new submission in DynamoDB.
     * @param {Submission} submission - The submission object to create.
     * @returns {Promise<Submission | null>} A promise that resolves when the submission is created.
     */
    async createSubmission(submission: Submission): Promise<Submission | null> {
        const params = {
            TableName: this.tableName,
            Item: {
                id: { S: submission.id },
                userId: { S: submission.userId },
                postId: { S: submission.postId },
                tweetId: { S: submission.tweetId },
                url: { S: submission.url },
                type: { S: submission.type },
                createdAt: { S: submission.createdAt },
                updatedAt: { S: submission.updatedAt }
            }
        };
        const putCommand = new PutItemCommand(params);
        const output = await this.dbClient.send(putCommand);
        if (output.$metadata.httpStatusCode === 200) return submission;
        return null;
    }

    /**
     * Updates an existing submission in DynamoDB.
     * @param {Submission} submission - The updated submission object.
     * @returns {Promise<Submission | null>} A promise that resolves when the submission is updated.
     */
    async updateSubmission(submission: Submission): Promise<Submission | null> {
        console.log(submission);
        return {} as Submission;
    }

    /**
     * Deletes a submission from DynamoDB by its ID.
     * @param {string} id - The ID of the submission to delete.
     * @returns {Promise<boolean>} A promise that resolves when the submission is deleted.
     */
    async deleteSubmission(id: string): Promise<boolean> {
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
