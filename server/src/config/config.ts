import fs from 'fs';
import dotenv from 'dotenv';

export const env = dotenv.parse(fs.readFileSync(__dirname + '/.env'));

const CONFIG = {
    ENV: env.ENV,
    SESSION_SECRET: env.SESSION_SECRET,
    URL: env.URL,
    PORT: env.PORT,
    CLIENT_PORT: env.CLIENT_PORT,
    REGION: env.REGION,
    TWITTER_TOKENS: {
        TWITTER_CLIENT_ID: env.TWITTER_CLIENT_ID,
        TWITTER_CLIENT_SECRET: env.TWITTER_CLIENT_SECRET
    },
    BEARER_TOKEN: env.TWITTER_BEARER_TOKEN,
    JWT_TOKEN_SECRET: env.JWT_TOKEN_SECRET,
    JWT_TOKEN_LIFE: env.JWT_TOKEN_LIFE
};

export default CONFIG;
