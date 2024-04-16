import { Post } from '../entities';

/**
 * Represents a repository interface for managing posts.
 */
export interface PostRepository {
    /**
     * Retrieves a post by its ID.
     * @param {string} id - The ID of the post to retrieve.
     * @returns {Promise<Post | null>} A promise that resolves with the retrieved post.
     */
    getById(id: string): Promise<Post | null>;

    /**
     * Retrieves all posts.
     * @returns {Promise<Post[]>} A promise that resolves with all posts.
     */
    getAllPosts(): Promise<Post[]>;

    /**
     * Creates a new post.
     * @param {Post} post - The post object to create.
     * @returns {Promise<Post | null>} A promise that resolves when the post is created.
     */
    createPost(post: Post): Promise<Post | null>;

    /**
     * Updates an existing post.
     * @param {Post} post - The updated post object.
     * @returns {Promise<Post | null>} A promise that resolves when the post is updated.
     */
    updatePost(post: Post): Promise<Post | null>;

    /**
     * Deletes a post by its ID.
     * @param {string} id - The ID of the post to delete.
     * @returns {Promise<boolean>} A promise that resolves when the post is deleted.
     */
    deletePost(id: string): Promise<boolean>;
}
