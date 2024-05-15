export enum Permission {
    ADMIN = 'admin',
    USER = 'user'
}

export interface TelegramData {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
    language_code: string;
}

export interface TwitterData {
    id: string;
    username: string;
    profile_image_url: string;
}

export interface XP {
    totalxp: number;
    claimed: number;
    unclaimed: number;
}

export interface User {
    id: string;
    email?: string;
    permission: Permission;
    xp: XP;
    twitter?: TwitterData | null;
    telegram?: TelegramData | null;
    createdAt: string;
    updatedAt: string;
}
