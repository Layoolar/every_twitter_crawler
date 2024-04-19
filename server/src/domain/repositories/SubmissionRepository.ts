/**
 * Repository interface for interacting with submissions in the data layer.
 * Provides methods for CRUD operations on submissions.
 */
import { Submission, SubmissionType } from '../entities/Submission';

export interface SubmissionRepository {
    /**
     * Retrieves a submission by its unique identifier.
     * @param id The unique identifier of the submission.
     * @returns A promise that resolves to the retrieved submission, or null if not found.
     */
    getById(id: string): Promise<Submission | null>;

    /**
     * Retrieves all submissions by a specific user for a given post.
     * @param userId The unique identifier of the user.
     * @param postId The unique identifier of the post.
     * @returns A promise that resolves to an array of submissions.
     */
    getAllSubmissionsByUser4Post(userId: string, postId: string): Promise<Submission[]>;

    /**
     * Retrieves all submissions that match the specified criteria.
     * @param userId The unique identifier of the user.
     * @param postId The unique identifier of the post.
     * @param type The type of submission.
     * @returns A promise that resolves to an array of submissions.
     */
    getAllSubmissionsByCriteria(userId: string, postId: string, type: SubmissionType): Promise<Submission[]>;

    /**
     * Retrieves all submissions for a specific post within the last 24 hours.
     * @param postId The unique identifier of the post.
     * @param type The type of submission.
     * @returns A promise that resolves to an array of submissions.
     */
    getAllSubmissionsLast24(postId: string, type: SubmissionType): Promise<Submission[]>;

    /**
     * Creates a new submission.
     * @param submission The submission object to create.
     * @returns A promise that resolves to the created submission, or null if creation failed.
     */
    createSubmission(submission: Submission): Promise<Submission | null>;

    /**
     * Updates an existing submission.
     * @param submission The submission object with updated data.
     * @returns A promise that resolves to the updated submission, or null if update failed.
     */
    updateSubmission(submission: Submission): Promise<Submission | null>;

    /**
     * Deletes a submission by its unique identifier.
     * @param id The unique identifier of the submission to delete.
     * @returns A promise that resolves to true if the deletion was successful, false otherwise.
     */
    deleteSubmission(id: string): Promise<boolean>;
}
