export enum SubmissionType {
    RETWEET = 'retweet',
    POST = 'post',
    COMMENT = 'comment',
    QUOTE = 'quote'
}

export interface Submission {
    id: string;
    userId: string;
    postId: string;
    tweetId: string;
    url: string;
    type: SubmissionType;
    createdAt: string;
    updatedAt: string;
}
