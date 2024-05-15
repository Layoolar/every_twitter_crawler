import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AuthUseCase } from '../../application/useCases/AuthUseCase';
import CONFIG from '../../config/config';
import { userDBImpl } from '../../infrastructure/data/dynamoDB';
import { httpStatusCodes, spawnNewClient, twitterClient } from '../../infrastructure/external';
import { AuthController } from '../controllers/AuthController';
import { BasePresenter } from '../presenter';

const authRouter = Router();

const presenter = new BasePresenter(httpStatusCodes);
const authUseCase = new AuthUseCase(userDBImpl, twitterClient, spawnNewClient);
const authController = new AuthController(authUseCase, `${CONFIG.URL}:${CONFIG.CLIENT_PORT}/login`, presenter);

authRouter.get('/twitter', expressAsyncHandler(authController.authLink.bind(authController)));
authRouter.post('/twitter/callback', expressAsyncHandler(authController.authCallback.bind(authController)));
// TODO add logout route

export default authRouter;
