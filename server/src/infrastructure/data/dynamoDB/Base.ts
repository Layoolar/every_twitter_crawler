import {
    AttributeDefinition,
    CreateTableCommand,
    DynamoDB,
    KeySchemaElement,
    ListTablesCommand
} from '@aws-sdk/client-dynamodb';

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
    protected tableName: string;

    constructor(dbClient: DynamoDB, tableName: string) {
        this.dbClient = dbClient;
        this.tableName = tableName;
    }

    async createTable(tableParams: TableParams) {
        const command = new ListTablesCommand({});
        const results = await this.dbClient.send(command);
        if (results.TableNames && !results.TableNames.includes(this.tableName)) {
            const createTableCommand = new CreateTableCommand(tableParams);
            const output = this.dbClient.send(createTableCommand);
            console.log('Created table. Table description JSON:', JSON.stringify(output, null, 2));
        }
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
                const child_key = Object.keys(value as Record<string, unknown>)[0];
                if (Base.isPrimitiveDBItem(child_key)) {
                    convertedItem[key] = (value as Record<string, unknown>)[`${child_key}`];
                } else {
                    convertedItem[key] = Base.convertItemData(value as Record<string, unknown>);
                }
            } else {
                convertedItem[key] = value;
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
