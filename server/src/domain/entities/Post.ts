export enum PostEntities {
    CASHTAGS = 'cashtags',
    HASHTAGS = 'hashtags',
    KEYWORDS = 'keywords'
}

export enum PostAction {
    RETWEET = 'retweet',
    POST = 'post',
    COMMENT = 'comment',
    LIKE = 'like',
    SHARE = 'share'
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
