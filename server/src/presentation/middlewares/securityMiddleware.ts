import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { config as appConfig } from '../../infrastructure/config/AppConfig';

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: parseInt(appConfig.getEnvByPath('security.rateLimitWindowMs')),
  limit: parseInt(appConfig.getEnvByPath('security.rateLimitMax')),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const securityMiddleware = [
  // Set security-related HTTP headers
  helmet(),

  // Enable CORS
  cors(corsOptions),

  // Prevent HTTP Parameter Pollution
  hpp(),

  // Rate limiting
  limiter,
];
