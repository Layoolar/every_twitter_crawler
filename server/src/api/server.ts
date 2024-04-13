import express from 'express';
import session from 'express-session';
import CONFIG from '../config/config';
import { ErrorHandlerMiddleware } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';
import userRouter from './routes/UserRouter';
import { HttpStatusCodes } from '../infrastructure/external/HttpStatusCodes';

const app = express();
const httpStatusCodes = new HttpStatusCodes();
const errorHandler = new ErrorHandlerMiddleware(httpStatusCodes);
app.use(express.json());

const sess: session.SessionOptions = {
    secret: CONFIG.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
};

if (CONFIG.ENV === 'production') {
    app.set('trust proxy', 1);
    sess.cookie = { secure: true };
}

app.use(session(sess));

app.use('/user', userRouter);

app.use(notFoundHandler);
app.use(errorHandler.execute.bind(errorHandler));

const port = CONFIG.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
