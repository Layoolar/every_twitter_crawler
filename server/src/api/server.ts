import express from 'express';
import session from 'express-session';
import CONFIG from '../config/config';
import { HttpStatusCodes } from '../infrastructure/external';
import { ErrorHandlerMiddleware, notFoundHandler } from './middlewares';
import { userRouter, postRouter, subRouter } from './routes';

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
app.use('/post', postRouter);
app.use('/submission', subRouter);

app.use(notFoundHandler);
app.use(errorHandler.execute.bind(errorHandler));

const port = CONFIG.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
