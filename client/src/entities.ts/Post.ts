export enum PostEntities {
	CASHTAGS = 'cashtags',
	HASHTAGS = 'hashtags',
	KEYWORDS = 'keywords',
	MENTIONS = 'mentions',
}

export enum PostAction {
	RETWEET = 'retweet',
	POST = 'post',
	COMMENT = 'comment',
	QUOTE = 'quote',
}

export interface Post {
	title: string;
	id: string;
	description: string;
	url: string;
	createdAt: string;
	updatedAt: string;
	text: string;
	endTime: string;
	entities: Partial<{
		[entity in PostEntities]: string[];
	}>;
	actions: Partial<{
		[action in PostAction]: number;
	}>;
}
