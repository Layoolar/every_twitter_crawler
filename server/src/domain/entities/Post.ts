export enum PostAction {
    RETWEET = 'RETWEET',
    POST = 'POST',
    COMMENT = 'COMMENT',
    LIKE = 'LIKE'
}

export interface Post {
    id: string;
    url: string;
    full_text: string;
    entitites: {
        cashtags: string[];
        hashtags: string[];
        keywords: string[];
    };
    actions: PostAction[];
    points: {
        [key in PostAction]: number;
    };
}
