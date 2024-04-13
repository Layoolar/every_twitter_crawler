import { Router } from 'express';
import { UserPresenter } from '../presenter/UserPresenter';
import { UserController } from '../controllers/UserController';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import dbClient from '../../infrastructure/data/DynamoDBClient';
import { UserUseCase } from '../../application/useCases/UserUseCase';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB/UserRepositoryImpl.ts';
import asyncHandler from 'express-async-handler';

const userRouter = Router();

const httpStatusCodes = new HttpStatusCodes();
const uuidGenerator = new UUIDGenerator();
const userPresenter = new UserPresenter(httpStatusCodes);
const userRepositoryImpl = new UserRepositoryImpl(dbClient);
const userUserCase = new UserUseCase(userRepositoryImpl, httpStatusCodes);
const userController = new UserController(userPresenter, httpStatusCodes, uuidGenerator, userUserCase);

userRouter.get('/', asyncHandler(userController.getUser.bind(userController)));
userRouter.post('/', asyncHandler(userController.saveUser.bind(userController)));
userRouter.delete('/', asyncHandler(userController.deleteUser.bind(userController)));

export default userRouter;
