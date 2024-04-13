export enum SubmissionType {
    RETWEET = 'RETWEET',
    POST = 'POST',
    COMMENT = 'COMMENT',
    LIKE = 'LIKE'
}

export interface Submission {
    id: string;
    userId: string;
    taskId: string;
    url: string;
    type: SubmissionType;
}
