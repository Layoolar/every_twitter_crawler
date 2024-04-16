import {
    AttributeDefinition,
    DeleteItemCommand,
    DynamoDB,
    GetItemCommand,
    KeySchemaElement,
    PutItemCommand,
    ScalarAttributeType
} from '@aws-sdk/client-dynamodb';
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Base } from './Base';

export class UserRepositoryImpl extends Base implements UserRepository {
    constructor(dbClient: DynamoDB) {
        super(dbClient, 'User');
        const params = {
            TableName: this.tableName,
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
        this.createTable(params);
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
        return this.dbClient.send(putCommand);
    }

    async updateUser(user: User) {
        // Implementation to update a user in DynamoDB
        console.log(user);
        return {} as UpdateCommandOutput;
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
        return this.dbClient.send(deleteCommand);
    }
}
