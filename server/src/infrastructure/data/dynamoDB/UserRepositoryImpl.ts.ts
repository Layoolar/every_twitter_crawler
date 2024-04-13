import {
    AttributeDefinition,
    DeleteItemCommand,
    DynamoDB,
    GetItemCommand,
    KeySchemaElement,
    ListTablesCommand,
    PutItemCommand,
    ScalarAttributeType
} from '@aws-sdk/client-dynamodb';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

export class UserRepositoryImpl implements UserRepository {
    private tableName = 'User';

    constructor(private readonly dbClient: DynamoDB) {
        this.createTable();
    }

    async createTable() {
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
        try {
            const command = new ListTablesCommand({});
            const results = await this.dbClient.send(command);
            if (results.TableNames && !results.TableNames.includes(this.tableName)) {
                this.dbClient.createTable(params, (err: unknown, data: unknown) => {
                    if (err) {
                        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
                        throw new Error('error while creating Table');
                    } else {
                        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    async findById(id: string) {
        // Implementation to find a user by id in DynamoDB
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: id }
            }
        };
        const getItemCommand = new GetItemCommand(params);
        return this.dbClient.send(getItemCommand);
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
