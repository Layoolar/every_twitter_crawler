// src/domain/repositories/SubmissionRepository.ts
import { Submission } from '../entities/Submission';

export interface SubmissionRepository {
    findById(id: string): Promise<Submission | null>;
    findByUserId(userId: string): Promise<Submission[]>;
    createSubmission(submission: Submission): Promise<Submission>;
    updateSubmission(submission: Submission): Promise<Submission>;
    deleteSubmission(id: string): Promise<void>;
}
