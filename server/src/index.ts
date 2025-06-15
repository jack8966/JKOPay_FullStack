import 'reflect-metadata';
import express from 'express';
import logger from './utils/logger';
import { AppDataSource } from './infrastructure/database/typeorm.config';
import charityRoutes from './presentation/routes/charityRoutes';
import { loggerMiddleware } from './presentation/middlewares/loggerMiddleware';
import { errorHandlerMiddleware } from './presentation/middlewares/errorHandlerMiddleware';
import { securityMiddleware } from './presentation/middlewares/securityMiddleware';
import { rateLimit } from 'express-rate-limit';
import { config as appConfig } from './infrastructure/config/AppConfig';

const app = express();
const port = process.env.PORT || 3000;

// Apply security middleware
app.use(securityMiddleware);

app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(loggerMiddleware);

// Initialize TypeORM
AppDataSource.initialize()
  .then(() => {
    logger.info('Database connection established');
  })
  .catch((error: Error) => {
    logger.error('Error during Data Source initialization:', error);
    throw error;
  });

// Rate limiting
const limiter = rateLimit({
  windowMs: appConfig.getEnvByPath('server.rateLimitWindowMs'),
  limit: appConfig.getEnvByPath('server.rateLimitMax'),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use(limiter);

// Routes
app.use('/api/charities', charityRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware (must be last)
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
