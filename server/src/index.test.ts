import request from 'supertest';
import express from 'express';

describe('Hello World API', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.get('/', (_req, res) => {
      res.json({ message: 'Hello World!' });
    });
  });

  it('should return hello world message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World!' });
  });
});
