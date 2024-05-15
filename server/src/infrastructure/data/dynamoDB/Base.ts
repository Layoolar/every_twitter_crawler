import {
    AttributeDefinition,
    CreateTableCommand,
    DescribeTableCommand,
    DynamoDB,
    KeySchemaElement,
    ListTablesCommand
} from '@aws-sdk/client-dynamodb';
import { ApplicationError } from '../../../application/errors/ApplicationError';

export type TableParams = {
    TableName: string;
    AttributeDefinitions: AttributeDefinition[];
    KeySchema: KeySchemaElement[];
    ProvisionedThroughput: {
        ReadCapacityUnits: number;
        WriteCapacityUnits: number;
    };
};

export class Base {
    protected dbClient: DynamoDB;

    constructor(dbClient: DynamoDB) {
        this.dbClient = dbClient;
    }

    async createTable(tableParams: TableParams, tableName: string) {
        if (!tableName) {
            throw new ApplicationError('Table name missing!', 500);
        }

        const listTablesCommand = new ListTablesCommand({});

        const results = await this.dbClient.send(listTablesCommand);
        if (results.TableNames && !results.TableNames.includes(tableName)) {
            const createTableCommand = new CreateTableCommand(tableParams);
            const output = await this.dbClient.send(createTableCommand);
            if (output.$metadata.httpStatusCode === 200 && output.TableDescription?.TableName === tableName) {
                if (output.TableDescription.TableStatus === 'CREATING') {
                    await this.waitForTableActive(tableName);
                }
            } else {
                throw new ApplicationError(`Error while creating table: ${tableName}`, 500);
            }
        }
    }

    private async waitForTableActive(tableName: string) {
        const pollInterval = 5000; // Polling interval in milliseconds
        const maxAttempts = 12; // Maximum number of attempts
        let attempts = 0;

        while (attempts < maxAttempts) {
            attempts++;

            if (await this.isTableActive(tableName)) {
                console.log(`Table "${tableName}" is active`);
                return; // Exit the function if table is active
            }

            // Wait for the polling interval before the next attempt
            await new Promise((resolve) => setTimeout(resolve, pollInterval));
        }

        // If maxAttempts reached and table is still not active, throw an error
        throw new Error(`Timeout: Table "${tableName}" did not become active within the specified time`);
    }

    private async isTableActive(tableName: string) {
        const params = {
            TableName: tableName
        };

        try {
            // Describe the table to get its status
            const command = new DescribeTableCommand(params);
            const data = await this.dbClient.send(command);
            const status = data.Table?.TableStatus;
            return status === 'ACTIVE';
        } catch (error) {
            console.error(`Error describing table: ${tableName}`, error);
            throw error;
        }
    }

    async deleteTable(tableName: string) {
        return tableName;
    }

    /**
     * Recursively converts DynamoDB item data to a format suitable for display or processing.
     * @param item The DynamoDB item data to convert.
     * @returns The converted item data in a more human-readable format.
     */
    static convertItemData(item: Record<string, unknown>): Record<string, unknown> {
        const convertedItem: Record<string, unknown> = {};

        for (const key in item) {
            const value = item[key];

            if (Base.isPrimitiveDBItem(key) || Base.isNonPrimitiveDBItem(key)) {
                return Base.convertItemData(item[key] as Record<string, unknown>);
            }

            if (Base.isObject(value)) {
                const childKey = Object.keys(value as Record<string, unknown>)[0];
                if (Base.isPrimitiveDBItem(childKey)) {
                    const val = (value as Record<string, unknown>)[childKey];
                    // DynamoDB returns numbers as strings, so we need to convert them to numbers
                    convertedItem[key] = childKey === 'N' ? parseInt(val as string) : childKey === 'NULL' ? null : val;
                } else {
                    convertedItem[key] = Base.convertItemData(value as Record<string, unknown>);
                }
            } else {
                // DynamoDB returns numbers as strings, so we need to convert them to numbers
                convertedItem[key] = key === 'N' ? parseInt(value as string) : key === 'NULL' ? null : value;
            }
        }

        return convertedItem;
    }

    /**
     * Checks if the given key corresponds to a primitive DynamoDB item type.
     * @param key The key to check.
     * @returns A boolean indicating whether the key corresponds to a primitive DynamoDB item type.
     */
    static isPrimitiveDBItem(key: string): boolean {
        const _dtypes = ['S', 'N', 'B', 'BOOL', 'NULL', 'SS', 'NS', 'BS'];
        return _dtypes.includes(key);
    }

    /**
     * Checks if the given key corresponds to a non-primitive DynamoDB item type.
     * @param key The key to check.
     * @returns A boolean indicating whether the key corresponds to a non-primitive DynamoDB item type.
     */
    static isNonPrimitiveDBItem(key: string): boolean {
        const _dtypes = ['M', 'L'];
        return _dtypes.includes(key);
    }

    /**
     * Checks if the given value is an object (excluding arrays and null).
     * @param item The value to check.
     * @returns A boolean indicating whether the value is an object.
     */
    static isObject(item: unknown): boolean {
        return typeof item === 'object' && item !== null && !Array.isArray(item);
    }
}
