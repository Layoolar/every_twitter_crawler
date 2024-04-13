import { Post } from '../entities/Post';

export interface PostRepository {
    findById(id: string): Promise<Post | null>;
    findAll(): Promise<Post[]>;
    createPost(post: Post): Promise<Post>;
    updatePost(post: Post): Promise<Post>;
    deletePost(id: string): Promise<void>;
}
