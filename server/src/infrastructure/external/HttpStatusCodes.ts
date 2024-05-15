import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

export class HttpStatusCodes {
    public ReasonPhrases = ReasonPhrases;
    public StatusCodes = StatusCodes;
    public getReasonPhrase = getReasonPhrase;
    public getStatusCode = getStatusCode;
}
