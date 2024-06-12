import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { PostUseCase } from '../../application/useCases';
import { postDBImpl } from '../../infrastructure/data/dynamoDB';
import { PostController } from '../controllers';
import { BasePresenter } from '../presenter';
import { authMiddlewares } from '../middlewares';
import { httpStatusCodes, uuidGen } from '../../infrastructure/external';

const postRouter = Router();
const postPresenter = new BasePresenter(httpStatusCodes);
const postUseCase = new PostUseCase(postDBImpl, httpStatusCodes);
const postController = new PostController(postPresenter, httpStatusCodes, uuidGen, postUseCase);

postRouter.use(
    expressAsyncHandler(authMiddlewares.isAuthenticated.bind(authMiddlewares)),
    expressAsyncHandler(authMiddlewares.requireUser)
);
postRouter.get('/', expressAsyncHandler(postController.getPost.bind(postController)));
postRouter.get('/all', expressAsyncHandler(postController.getAllPosts.bind(postController)));
postRouter.post(
    '/',
    expressAsyncHandler(authMiddlewares.requireAdmin),
    expressAsyncHandler(postController.savePost.bind(postController))
);
postRouter.delete(
    '/',
    expressAsyncHandler(authMiddlewares.requireAdmin),
    expressAsyncHandler(postController.deletePost.bind(postController))
);

export default postRouter;
