import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { SubmissionUseCase } from '../../application/useCases';
import CONFIG from '../../config/config';
import dbClient from '../../infrastructure/data';
import { SubmissionRepositoryImpl } from '../../infrastructure/data/dynamoDB';
import { HttpStatusCodes, UUIDGenerator } from '../../infrastructure/external';
import { SubmissionController } from '../controllers';
import { BasePresenter } from '../presenter';

const subRouter = Router();

let subDBImpl: SubmissionRepositoryImpl;
if (CONFIG.ENV === 'development') {
    subDBImpl = new SubmissionRepositoryImpl(dbClient, 'dev_submission');
} else if (CONFIG.ENV === 'test') {
    subDBImpl = new SubmissionRepositoryImpl(dbClient, 'test_submission');
} else {
    subDBImpl = new SubmissionRepositoryImpl(dbClient);
}
(async () => {
    await subDBImpl.createTable(subDBImpl.params, subDBImpl.tableName);
})();

const uuidGenerator = new UUIDGenerator();
const httpStatusCodes = new HttpStatusCodes();
const subPresenter = new BasePresenter(httpStatusCodes);
const subUseCase = new SubmissionUseCase(subDBImpl, httpStatusCodes);
const subController = new SubmissionController(subPresenter, httpStatusCodes, uuidGenerator, subUseCase);

subRouter.get('/', expressAsyncHandler(subController.getAllSubmissions.bind(subController)));
subRouter.post('/', expressAsyncHandler(subController.saveSubmission.bind(subController)));
subRouter.delete('/', expressAsyncHandler(subController.deleteSubmission.bind(subController)));

export default subRouter;
