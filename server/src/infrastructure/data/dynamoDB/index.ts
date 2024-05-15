import dbClient from '..';
import CONFIG from '../../../config/config';
import { PostRepositoryImpl } from './PostRepositoryImpl';
import { SubmissionRepositoryImpl } from './SubmissionRepositoryImpl';
import { UserRepositoryImpl } from './UserRepositoryImpl';

let userDB: UserRepositoryImpl;
let postDB: PostRepositoryImpl;
let subDB: SubmissionRepositoryImpl;
if (CONFIG.ENV === 'development') {
    userDB = new UserRepositoryImpl(dbClient, 'dev_user');
    postDB = new PostRepositoryImpl(dbClient, 'dev_post');
    subDB = new SubmissionRepositoryImpl(dbClient, 'dev_submission');
} else if (CONFIG.ENV === 'test') {
    userDB = new UserRepositoryImpl(dbClient, 'test_user');
    postDB = new PostRepositoryImpl(dbClient, 'test_post');
    subDB = new SubmissionRepositoryImpl(dbClient, 'test_submission');
} else {
    userDB = new UserRepositoryImpl(dbClient);
    postDB = new PostRepositoryImpl(dbClient);
    subDB = new SubmissionRepositoryImpl(dbClient);
}
(async () => {
    await userDB.createTable(userDB.params, userDB.tableName);
    await postDB.createTable(postDB.params, postDB.tableName);
    await subDB.createTable(subDB.params, subDB.tableName);
})();

const userDBImpl = userDB;
const postDBImpl = postDB;
const subDBImpl = subDB;

export { userDBImpl, postDBImpl, subDBImpl };
