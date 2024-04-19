export enum PostEntities {
    CASHTAGS = 'cashtags',
    HASHTAGS = 'hashtags',
    KEYWORDS = 'keywords',
    MENTIONS = 'mentions'
}

export enum PostAction {
    RETWEET = 'retweet',
    POST = 'post',
    COMMENT = 'comment',
    QUOTE = 'quote'
}

export interface Post {
    id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    fullText: string;
    entities: Partial<{
        [entity in PostEntities]: string[];
    }>;
    actions: Partial<{
        [action in PostAction]: number;
    }>;
}
