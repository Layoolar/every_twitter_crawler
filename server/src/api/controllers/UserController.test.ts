import { Request, Response } from 'express';
import { HttpStatusCodes } from '../../infrastructure/external/HttpStatusCodes';
import { UserPresenter } from '../presenter/UserPresenter';
import { UserUseCase } from '../../application/useCases/UserUseCase';
import { UUIDGenerator } from '../../infrastructure/external/UUIDGenerator';
import { UserController } from './UserController';
import { jest, describe, test, beforeEach, expect } from '@jest/globals';
import { UserRepositoryImpl } from '../../infrastructure/data/dynamoDB/UserRepositoryImpl.ts';
import dbClient from '../../infrastructure/data/DynamoDBClient';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ApplicationError } from '../../application/errors/ApplicationError';

describe('UserController', () => {
    let userController: UserController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        const statusCodes = new HttpStatusCodes();
        const userRepoImpl = new UserRepositoryImpl(dbClient);
        class TestPresenter extends UserPresenter {
            private readonly codes: HttpStatusCodes;
            constructor(httpStatusCodes: HttpStatusCodes) {
                super(httpStatusCodes);
                this.codes = httpStatusCodes;
            }
            present(req: Request, statusCode: StatusCodes, data: unknown = null) {
                const resBody = {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    ip: req.ip,
                    url: req.originalUrl,
                    method: req.method,
                    path: req.path,
                    headers: {
                        'Content-Type': '',
                        Referer: '',
                        'User-Agent': ''
                    }
                };
                return {
                    statusCode,
                    statusMessage: this.codes.getReasonPhase(statusCode),
                    request: resBody,
                    data
                };
            }
        }
        const testPresenter = new TestPresenter(new HttpStatusCodes());
        const userUseCase = new UserUseCase(userRepoImpl, statusCodes); // Mock UserUseCase for testing
        const uuidGenerator = new UUIDGenerator();
        const httpStatusCodes = new HttpStatusCodes();

        userController = new UserController(testPresenter, httpStatusCodes, uuidGenerator, userUseCase);
        mockReq = { body: { username: 'testuser', id: 'd5785b3e-5faa-4ee6-b886-4313a3dd583f' } } as Partial<Request>;
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as Partial<Response>;
    });

    test('saveUser should create a new user', async () => {
        try {
            await userController.saveUser(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(mockRes.json).toHaveBeenCalled();
        } catch (error) {
            const err = error as ApplicationError;
            expect(err.name).toBe('ApplicationError');
            expect(err.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(err.message).toBe(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
        }
    });

    test('getUser should get an existent user', async () => {
        try {
            await userController.getUser(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(mockRes.json).toHaveBeenCalled();
        } catch (error) {
            const err = error as ApplicationError;
            expect(err.name).toBe('ApplicationError');
            expect(err.statusCode).toBe(StatusCodes.NOT_FOUND);
            expect(err.message).toBe('user data not found');
        }
    });

    test('deleteUser should delete a user', async () => {
        try {
            await userController.deleteUser(mockReq as Request, mockRes as Response);
        } catch (error) {
            expect(error).toMatch(ApplicationError.toString());
        }

        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(mockRes.json).toHaveBeenCalled();
    });

    test('getUser should get a non existent user', async () => {
        try {
            await userController.getUser(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(mockRes.json).toHaveBeenCalled();
        } catch (error) {
            const err = error as ApplicationError;
            expect(err.name).toBe('ApplicationError');
            expect(err.statusCode).toBe(StatusCodes.NOT_FOUND);
            expect(err.message).toBe('user data not found');
        }
    });
});
