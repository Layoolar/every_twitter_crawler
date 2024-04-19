import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { UserUseCase } from '../../application/useCases';
import CONFIG from '../../config/config';
import dbClient from '../../infrastructure/data';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB';
import { HttpStatusCodes, UUIDGenerator } from '../../infrastructure/external';
import { UserController } from '../controllers';
import { BasePresenter } from '../presenter';

const userRouter = Router();

let userDBImpl = new UserRepositoryImpl(dbClient);
if (CONFIG.ENV === 'development') {
    userDBImpl = new UserRepositoryImpl(dbClient, 'dev_user');
} else if (CONFIG.ENV === 'test') {
    userDBImpl = new UserRepositoryImpl(dbClient, 'test_user');
} else {
    userDBImpl = new UserRepositoryImpl(dbClient);
}
(async () => {
    await userDBImpl.createTable(userDBImpl.params, userDBImpl.tableName);
})();

const httpStatusCodes = new HttpStatusCodes();
const uuidGenerator = new UUIDGenerator();
const userPresenter = new BasePresenter(httpStatusCodes);
const userUserCase = new UserUseCase(userDBImpl, httpStatusCodes);
const userController = new UserController(userPresenter, httpStatusCodes, uuidGenerator, userUserCase);

userRouter.get('/', expressAsyncHandler(userController.getUser.bind(userController)));
userRouter.post('/', expressAsyncHandler(userController.saveUser.bind(userController)));
userRouter.delete('/', expressAsyncHandler(userController.deleteUser.bind(userController)));

export default userRouter;
