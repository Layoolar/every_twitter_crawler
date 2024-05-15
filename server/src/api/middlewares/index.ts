import { Middleware } from './AuthMiddlewares';
import { ErrorHandlerMiddleware } from './ErrorHandlerMiddleware';
import { userDBImpl } from '../../infrastructure/data/dynamoDB';
import { LoggingMiddleware } from './LoggingMiddleware';
import { httpStatusCodes } from '../../infrastructure/external';

const authMiddlewares = new Middleware(userDBImpl);
const errorMiddlewares = new ErrorHandlerMiddleware(httpStatusCodes);
const loggingMiddlewares = new LoggingMiddleware();

export { authMiddlewares, errorMiddlewares, loggingMiddlewares };
