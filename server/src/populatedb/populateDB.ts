import { PostUseCase } from '../application/useCases';
import dbClient from '../infrastructure/data';
import { PostRepositoryImpl } from '../infrastructure/data/dynamoDB/PostRepositoryImpl';
import { HttpStatusCodes } from '../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../infrastructure/external/UUIDGenerator';
import { data } from './data';

const populate = async () => {
    const tableName = 'dev_post';
    const uuidGenerator = new UUIDGenerator();
    const httpStatusCodes = new HttpStatusCodes();
    const postDBImpl = new PostRepositoryImpl(dbClient, tableName);
    // Instantiate PostUseCase with the PostRepositoryImpl and HTTP status codes
    const postUseCase = new PostUseCase(postDBImpl, httpStatusCodes);

    for (const item of data) {
        item.id = uuidGenerator.generateId();
        try {
            const result = await postUseCase.createPost(item);
            if (result) {
                console.log(`Item ${result.id} saved`);
            }
        } catch (error) {
            console.log(error);
        }
    }
};

populate();
