import { ApplicationError } from './ApplicationError';

export class NotFoundError extends ApplicationError {
    constructor(message = 'Not Found', data?: unknown) {
        super(message, 404, data);
    }
}
