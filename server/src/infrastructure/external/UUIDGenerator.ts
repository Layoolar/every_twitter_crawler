import { randomUUID } from 'crypto';

export class UUIDGenerator {
    generateId(): string {
        return randomUUID();
    }
}
