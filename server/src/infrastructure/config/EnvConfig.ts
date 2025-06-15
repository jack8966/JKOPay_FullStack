export class EnvConfig {
  private static instance: EnvConfig;

  private constructor() {}

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }

  public getEnvValue(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  }

  public validateNodeEnv(env: string): 'development' | 'production' | 'test' {
    if (!['development', 'production', 'test'].includes(env)) {
      throw new Error(`Invalid NODE_ENV: ${env}`);
    }
    return env as 'development' | 'production' | 'test';
  }

  public validatePort(port: string): number {
    const portNumber = parseInt(port, 10);
    if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      throw new Error(`Invalid port number: ${port}`);
    }
    return portNumber;
  }

  public validateLogLevel(level: string): 'error' | 'warn' | 'info' | 'debug' {
    if (!['error', 'warn', 'info', 'debug'].includes(level)) {
      throw new Error(`Invalid LOG_LEVEL: ${level}`);
    }
    return level as 'error' | 'warn' | 'info' | 'debug';
  }

  public validateAllowedOrigins(origins: string): string[] {
    return origins.split(',').map((origin) => origin.trim());
  }
}
