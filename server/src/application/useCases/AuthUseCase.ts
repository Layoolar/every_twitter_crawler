import { TwitterApi, UserV2 } from 'twitter-api-v2';
import { User } from '../../domain/entities';
import { Permission } from '../../domain/entities/User';
import { ApplicationError } from '../errors';
import jwt from 'jsonwebtoken';
import CONFIG from '../../config/config';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB/UserRepositoryImpl';
import { TwitterAPIV2 } from '../../infrastructure/external/TwitterAPIV2';

export class AuthUseCase {
    constructor(
        private readonly userDBImpl: UserRepositoryImpl,
        private readonly twitterClient: TwitterAPIV2,
        private readonly newClient: () => TwitterApi
    ) {}

    async getAuthLink(callback_url: string) {
        return this.twitterClient.generateAuthLink(callback_url);
    }

    async authCallback(code: string, codeVerifier: string, callback_url: string) {
        const data = await this.twitterClient.getTokenAndData(code, codeVerifier, callback_url);
        if (!data) throw new ApplicationError('Authorization failed', 401);
        const {
            // auth: { accessToken },
            user: userObject
        } = data;
        // sign token jwt
        const TOKEN_EXPIRES_IN = CONFIG.JWT_TOKEN_LIFE;
        const TOKEN_SECRET = CONFIG.JWT_TOKEN_SECRET;
        const token = jwt.sign({ sub: userObject.id }, TOKEN_SECRET, {
            expiresIn: `${TOKEN_EXPIRES_IN}m`
        });
        if (!userObject)
            throw new ApplicationError('Unable to fetch user data from Twitter, try logging in again', 400);
        let user: User;
        const userExists = await this.userDBImpl.getById(userObject.id);
        console.log('user exists ...');
        if (userExists) {
            user = {
                ...userExists,
                twitter: {
                    id: userObject.id,
                    username: userObject.username,
                    profile_image_url: userObject.profile_image_url ?? ''
                },
                updatedAt: new Date().toISOString()
            };
            const output = await this.userDBImpl.createUser(user);
            if (!output) throw new ApplicationError('An error occured while updating user', 500);
        } else {
            user = {
                id: userObject.id,
                permission: Permission.USER,
                twitter: {
                    id: userObject.id,
                    username: userObject.username,
                    profile_image_url: userObject.profile_image_url ?? ''
                },
                xp: {
                    totalxp: 0,
                    claimed: 0,
                    unclaimed: 0
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            const output = await this.userDBImpl.createUser(user);
            if (!output) throw new ApplicationError('An error occured while creating user', 500);
        }
        return { user, token };
    }

    async _authCallback(code: string, codeVerifier: string, callback_url: string) {
        const tempClient = this.newClient();
        let userObject: UserV2 | undefined;
        try {
            const {
                client: loggedClient
                // accessToken,
                // refreshToken,
                // expiresIn
            } = await tempClient.loginWithOAuth2({
                code,
                redirectUri: callback_url,
                codeVerifier
            });

            // Store accessToken somewhere, it will be valid until expiresIn is hit.
            // If you want to refresh your token later, store refreshToken (it is present if 'offline.access' has been given as scope)

            const { data } = await loggedClient.v2.me({
                'user.fields': ['profile_image_url', 'url', 'location']
            });
            userObject = data;
        } catch (error) {
            console.log(error);
        }

        if (!userObject)
            throw new ApplicationError('Unable to fetch user data from Twitter, try logging in again', 400);

        console.log('user data', userObject);

        return {};
    }
}
