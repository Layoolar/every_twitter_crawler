import { ApplicationError } from './ApplicationError';

export class InternalServerError extends ApplicationError {
    constructor(message = 'Internal Server Error', data?: unknown) {
        super(message, 500, data);
    }
}
