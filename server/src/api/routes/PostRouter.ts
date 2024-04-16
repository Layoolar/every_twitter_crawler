import { Router } from 'express';
import { PostUseCase } from '../../application/useCases/PostUseCase';
import dbClient from '../../infrastructure/data/DynamoDBClient';
import { PostRepositoryImpl } from '../../infrastructure/data/dynamoDB/PostRepositoryImpl';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { PostPresenter } from '../presenter/PostPresenter';
import { PostController } from '../controllers/PostController';
import asyncHandler from 'express-async-handler';

const postRouter = Router();

const postDBImpl = new PostRepositoryImpl(dbClient);
const uuidGenerator = new UUIDGenerator();
const httpStatusCodes = new HttpStatusCodes();
const postPresenter = new PostPresenter(httpStatusCodes);
const postUseCase = new PostUseCase(postDBImpl, httpStatusCodes);
const postController = new PostController(postPresenter, httpStatusCodes, uuidGenerator, postUseCase);

postRouter.get('/', asyncHandler(postController.getPost.bind(postController)));
postRouter.get('/all', asyncHandler(postController.getAllPosts.bind(postController)));
postRouter.post('/', asyncHandler(postController.savePost.bind(postController)));
postRouter.delete('/', asyncHandler(postController.deletePost.bind(postController)));

export default postRouter;
