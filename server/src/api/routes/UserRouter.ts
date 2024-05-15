import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { UserUseCase } from '../../application/useCases';
import { UserController } from '../controllers';
import { BasePresenter } from '../presenter';
import { userDBImpl } from '../../infrastructure/data/dynamoDB';
import { httpStatusCodes } from '../../infrastructure/external';
import { authMiddlewares } from '../middlewares';

const userRouter = Router();
const userPresenter = new BasePresenter(httpStatusCodes);
const userUseCase = new UserUseCase(userDBImpl, httpStatusCodes);
const userController = new UserController(userPresenter, httpStatusCodes, userUseCase);

userRouter.use(
    expressAsyncHandler(authMiddlewares.isAuthenticated.bind(authMiddlewares)),
    expressAsyncHandler(authMiddlewares.requireUser)
);
userRouter.get('/', expressAsyncHandler(userController.getUser.bind(userController)));
userRouter.delete('/', expressAsyncHandler(userController.deleteUser.bind(userController)));

export default userRouter;
