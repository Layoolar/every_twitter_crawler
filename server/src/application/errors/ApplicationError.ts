export class ApplicationError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
        public readonly data?: unknown
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
