export enum Permission {
    ADMIN = 'SUPERUSER',
    USER = 'USER'
}

export interface User {
    id: string;
    username: string;
    permission: Permission;
    accumulatedXP: number;
    email: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
}
