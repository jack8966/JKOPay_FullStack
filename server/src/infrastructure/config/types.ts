// Base configuration types
export interface ServerConfig {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
}

export interface SecurityConfig {
  allowedOrigins: string[];
  rateLimitWindowMs: string;
  rateLimitMax: string;
}

// Root configuration type
export interface AppConfig {
  server: ServerConfig;
  database: DatabaseConfig;
  logging: LoggingConfig;
  security: SecurityConfig;
}

// Environment variable mapping type
export interface EnvMapping {
  server: {
    nodeEnv: string;
    port: string;
  };
  database: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
  logging: {
    level: string;
  };
  security: {
    allowedOrigins: string;
    rateLimitWindowMs: string;
    rateLimitMax: string;
  };
}
