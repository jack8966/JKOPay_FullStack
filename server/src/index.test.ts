import request from 'supertest';
import express from 'express';
import { AppDataSource } from './infrastructure/database/typeorm.config';
import { loggerMiddleware } from './presentation/middlewares/loggerMiddleware';
import { errorHandlerMiddleware } from './presentation/middlewares/errorHandlerMiddleware';
import { securityMiddleware } from './presentation/middlewares/securityMiddleware';
import charityRoutes from './presentation/routes/charityRoutes';

describe('Express Application', () => {
  let app: express.Application;

  beforeAll(async () => {
    // Mock database connection
    jest.spyOn(AppDataSource, 'initialize').mockResolvedValue(AppDataSource);

    app = express();
    app.use(securityMiddleware);
    app.use(express.json({ limit: '10kb' }));
    app.use(loggerMiddleware);
    app.use('/api/charities', charityRoutes);
    app.use(errorHandlerMiddleware);
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  describe('Health Check Endpoint', () => {
    it('should return 200 and status ok', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('Security Middleware', () => {
    it('should have security headers', async () => {
      const response = await request(app).get('/health');
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers).toHaveProperty('x-xss-protection');
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.status).toBe(404);
    });
  });

  describe('Database Connection', () => {
    it('should initialize database connection', async () => {
      expect(AppDataSource.initialize).toHaveBeenCalled();
    });
  });
});
