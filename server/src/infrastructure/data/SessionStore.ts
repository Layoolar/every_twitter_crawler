import ConnectDynamoDB from 'connect-dynamodb';
import session from 'express-session';
import dbClient from '.';
import { Base } from './dynamoDB/Base';
import { ScalarAttributeType, AttributeDefinition, KeySchemaElement } from '@aws-sdk/client-dynamodb';

export interface SessionData {
    [key: string]: unknown;
    url?: string;
    state?: string;
    codeVerifier?: string;
    callback_url?: string;
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
}

export const options = {
    table: 'evc-sessions',
    client: dbClient,
    create: true
};

const base = new Base(dbClient);
const tableParams = {
    TableName: 'evc-sessions',
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

(async () => {
    await base.createTable(tableParams, 'evc-sessions');
})();

const createSessionStore = ConnectDynamoDB<SessionData>(session);

const DynamoDBStore = new createSessionStore(options);

export default DynamoDBStore;
