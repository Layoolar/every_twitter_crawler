import {
    AttributeDefinition,
    DeleteItemCommand,
    DynamoDB,
    GetItemCommand,
    KeySchemaElement,
    PutItemCommand,
    ScalarAttributeType,
    UpdateItemCommand
} from '@aws-sdk/client-dynamodb';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Base, TableParams } from './Base';

export class UserRepositoryImpl extends Base implements UserRepository {
    params: TableParams;
    tableName: string;
    constructor(dbClient: DynamoDB, tableName = 'User') {
        super(dbClient);
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

    async getById(id: string) {
        // Implementation to find a user by id in DynamoDB
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: id }
            }
        };
        const getItemCommand = new GetItemCommand(params);
        const output = await this.dbClient.send(getItemCommand);
        if (output.$metadata.httpStatusCode === 200 && output.Item) {
            const convertedItem = Base.convertItemData(output.Item) as unknown as User;
            return convertedItem;
        }
        return null;
    }

    async createUser(user: User) {
        // Implementation to create a user in DynamoDB
        const params = {
            TableName: this.tableName,
            Item: {
                id: { S: user.id },
                username: { S: user.username },
                permission: { S: user.permission },
                accumulatedXP: { N: user.accumulatedXP.toString() },
                email: { S: user.email },
                location: { S: user.location },
                createdAt: { S: user.createdAt },
                updatedAt: { S: user.updatedAt },
                accessToken: { S: user.accessToken ?? '' },
                refreshToken: { S: user.refreshToken ?? '' },
                expiresIn: { N: user.expiresIn?.toString() ?? '0' }
            }
        };
        const putCommand = new PutItemCommand(params);
        const output = await this.dbClient.send(putCommand);
        if (output.$metadata.httpStatusCode === 200) {
            return user;
        }
        return null;
    }

    async updateUserPoints(id: string, newPoints: number) {
        // Implementation to update a user in DynamoDB
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: id }
            },
            UpdateExpression: 'SET accumulatedXP = accumulatedXP + :newPoints, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ':newPoints': { N: String(newPoints) },
                ':updatedAt': { S: new Date().toISOString() }
            }
        };
        const updateCommand = new UpdateItemCommand(params);
        const output = await this.dbClient.send(updateCommand);
        if (output.$metadata.httpStatusCode === 200) {
            return true;
        }
        return false;
    }

    async deleteUser(id: string) {
        // Implementation to delete a user in DynamoDB
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
