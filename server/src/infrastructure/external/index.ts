import { HttpStatusCodes } from './HttpStatusCodes';
import { TwitterAPIV2, spawnNewClient } from './TwitterAPIV2';
import { UUIDGenerator } from './UUIDGenerator';

const httpStatusCodes = new HttpStatusCodes();
const twitterClient = new TwitterAPIV2();
const uuidGen = new UUIDGenerator();

export { twitterClient, spawnNewClient, httpStatusCodes, uuidGen };
