import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';

export class HttpStatusCodes {
    public ReasonPhrases = ReasonPhrases;
    public StatusCodes = StatusCodes;

    getReasonPhase(statusCode: string | number) {
        return getReasonPhrase(statusCode);
    }

    getStatusCode(reasonPhrase: string) {
        getStatusCode(reasonPhrase);
    }
}
