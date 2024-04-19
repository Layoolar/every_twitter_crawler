import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { PostUseCase } from '../../application/useCases';
import CONFIG from '../../config/config';
import dbClient from '../../infrastructure/data';
import { PostRepositoryImpl } from '../../infrastructure/data/dynamoDB';
import { HttpStatusCodes, UUIDGenerator } from '../../infrastructure/external';
import { PostController } from '../controllers';
import { BasePresenter } from '../presenter';

const postRouter = Router();

let postDBImpl = new PostRepositoryImpl(dbClient);
if (CONFIG.ENV === 'development') {
    postDBImpl = new PostRepositoryImpl(dbClient, 'dev_post');
} else if (CONFIG.ENV === 'test') {
    postDBImpl = new PostRepositoryImpl(dbClient, 'test_post');
} else {
    postDBImpl = new PostRepositoryImpl(dbClient);
}
(async () => {
    await postDBImpl.createTable(postDBImpl.params, postDBImpl.tableName);
})();

const uuidGenerator = new UUIDGenerator();
const httpStatusCodes = new HttpStatusCodes();
const postPresenter = new BasePresenter(httpStatusCodes);
const postUseCase = new PostUseCase(postDBImpl, httpStatusCodes);
const postController = new PostController(postPresenter, httpStatusCodes, uuidGenerator, postUseCase);

postRouter.get('/', expressAsyncHandler(postController.getPost.bind(postController)));
postRouter.get('/all', expressAsyncHandler(postController.getAllPosts.bind(postController)));
postRouter.post('/', expressAsyncHandler(postController.savePost.bind(postController)));
postRouter.delete('/', expressAsyncHandler(postController.deletePost.bind(postController)));

export default postRouter;
