import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { SubmissionUseCase } from '../../application/useCases';
import { SubmissionController } from '../controllers';
import { BasePresenter } from '../presenter';
import { subDBImpl } from '../../infrastructure/data/dynamoDB';
import { authMiddlewares } from '../middlewares';
import { httpStatusCodes, uuidGen } from '../../infrastructure/external';

const subRouter = Router();

const subPresenter = new BasePresenter(httpStatusCodes);
const subUseCase = new SubmissionUseCase(subDBImpl, httpStatusCodes);
const subController = new SubmissionController(subPresenter, httpStatusCodes, uuidGen, subUseCase);

subRouter.use(
    expressAsyncHandler(authMiddlewares.isAuthenticated.bind(authMiddlewares)),
    expressAsyncHandler(authMiddlewares.requireUser)
);
subRouter.get('/', expressAsyncHandler(subController.getAllSubmissions.bind(subController)));
subRouter.post('/', expressAsyncHandler(subController.saveSubmission.bind(subController)));
subRouter.delete('/', expressAsyncHandler(subController.deleteSubmission.bind(subController)));

export default subRouter;
