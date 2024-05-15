import { Request, Response } from 'express';
import { ApplicationError } from '../../application/errors';
import { AuthUseCase } from '../../application/useCases/AuthUseCase';
import { BasePresenter } from '../presenter';
import CONFIG from '../../config/config';

export class AuthController {
    constructor(
        private readonly authUseCase: AuthUseCase,
        private readonly callback_url: string,
        private readonly presenter: BasePresenter
    ) {}

    async authLink(req: Request, res: Response) {
        const data = await this.authUseCase.getAuthLink(this.callback_url);
        req.session.userAuth = req.session.userAuth
            ? req.session.userAuth
            : {
                  codeVerifier: '',
                  state: '',
                  callback_url: ''
              };
        req.session.userAuth.codeVerifier = data.codeVerifier;
        req.session.userAuth.state = data.state;
        req.session.userAuth.callback_url = this.callback_url;
        res.status(200).json(data.url);
    }

    async authCallback(req: Request, res: Response) {
        const { state, code } = req.body;
        if (!req.session.userAuth) throw new ApplicationError('Session expired!', 400);
        if (!code || !state)
            throw new ApplicationError('You denied the app access, authorization code not provided!', 400);
        const { codeVerifier, state: sessionState, callback_url } = req.session.userAuth;
        if (!codeVerifier || !sessionState || !callback_url) {
            throw new ApplicationError('Invalid session or missing parameters', 400);
        }
        if (state !== sessionState) {
            // eslint-disable-next-line quotes
            throw new ApplicationError("Stored tokens didn't match!", 400);
        }
        const { user, token } = await this.authUseCase.authCallback(code, codeVerifier, callback_url);
        const TOKEN_EXPIRES_IN = +CONFIG.JWT_TOKEN_LIFE;
        // set token jwt on cookie
        res.cookie('token', token, {
            expires: new Date(Date.now() + TOKEN_EXPIRES_IN * 60 * 1000)
        });
        res.status(200).json(this.presenter.present(req, 200, user));
    }
    // async verifyRefreshToken(req: Request, res: Response, next: NextFunction) {}
}
