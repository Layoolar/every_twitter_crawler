import { DynamoDB } from '@aws-sdk/client-dynamodb';
import CONFIG from '../../config/config';

export const dbClient = new DynamoDB({ region: CONFIG.REGION });

export default dbClient;
