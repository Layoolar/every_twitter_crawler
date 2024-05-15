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
                email: user.email ? { S: user.email } : { NULL: true },
                permission: { S: user.permission },
                xp: {
                    M: {
                        totalxp: { N: user.xp.totalxp.toString() },
                        claimed: { N: user.xp.claimed.toString() },
                        unclaimed: { N: user.xp.unclaimed.toString() }
                    }
                },
                twitter: user.twitter
                    ? {
                          M: {
                              id: { S: user.twitter.id },
                              username: { S: user.twitter.username },
                              profile_image_url: { S: user.twitter.profile_image_url }
                          }
                      }
                    : { NULL: true },
                telegram: user.telegram
                    ? {
                          M: {
                              id: { N: user.telegram.id.toString() },
                              is_bot: { BOOL: user.telegram.is_bot },
                              first_name: { S: user.telegram.first_name },
                              username: { S: user.telegram.username },
                              language_code: { S: user.telegram.language_code }
                          }
                      }
                    : { NULL: true },
                createdAt: { S: user.createdAt },
                updatedAt: { S: user.updatedAt }
            }
        };
        const putCommand = new PutItemCommand(params);
        const output = await this.dbClient.send(putCommand);
        if (output.$metadata.httpStatusCode === 200) {
            return user;
        }
        return null;
    }

    async updateUserDataFromTwitter(user: User) {
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: user.id }
            },
            UpdateExpression:
                'SET #attr.#key.#id = :id, #attr.#key.#username = :username, #attr.#key.#profile_image_url = :profile_image_url',
            ExpressionAttributeNames: {
                '#attr': 'twitter',
                '#key': 'M',
                '#auth_attr': 'authData',
                '#id': 'id',
                '#username': 'username',
                '#profile_image_url': 'profile_image_url'
            },
            ExpressionAttributeValues: {
                ':id': user.twitter ? { S: user.twitter.id } : { NULL: true },
                ':username': user.twitter ? { S: user.twitter.username } : { NULL: true },
                ':profile_image_url': user.twitter ? { S: user.twitter.profile_image_url } : { NULL: true }
            }
        };

        const updateCommand = new UpdateItemCommand(params);
        const output = await this.dbClient.send(updateCommand);
        return output.$metadata.httpStatusCode === 200;
    }

    async updateUserPoints(id: string, newPoints: number): Promise<boolean> {
        const params = {
            TableName: this.tableName,
            Key: {
                id: { S: id }
            },
            UpdateExpression: 'SET xp.totalxp = xp.totalxp + :newPoints, xp.unclaimed = xp.unclaimed + :newPoints',
            ExpressionAttributeValues: {
                ':newPoints': { N: newPoints.toString() }
            }
        };
        const updateCommand = new UpdateItemCommand(params);
        const output = await this.dbClient.send(updateCommand);
        return output.$metadata.httpStatusCode === 200;
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
        return output.$metadata.httpStatusCode === 200;
    }
}
