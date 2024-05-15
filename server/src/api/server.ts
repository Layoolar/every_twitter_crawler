import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import CONFIG from '../config/config';
import DynamoDBStore from '../infrastructure/data/SessionStore';
import { errorMiddlewares, loggingMiddlewares } from './middlewares';
import { postRouter, subRouter, userRouter } from './routes';
import authRouter from './routes/AuthRouter';

declare module 'express-session' {
    interface SessionData {
        userAuth: {
            state: string;
            codeVerifier: string;
            callback_url: string;
        };
    }
}

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
// uncomment in test and prod
// app.set('trust proxy', 1);

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
};
app.use(cors(corsOptions));

const sess: session.SessionOptions = {
    secret: CONFIG.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000,
        sameSite: 'strict',
        // TODO change to true in test and prod
        secure: false
    },
    store: DynamoDBStore
};

app.use(session(sess));

app.use(loggingMiddlewares.requestLogger);

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/submission', subRouter);

app.use(errorMiddlewares.notFoundHandler);
app.use(errorMiddlewares.catchAllHandler.bind(errorMiddlewares));

const port = CONFIG.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
