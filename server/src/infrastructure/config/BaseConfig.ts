import { AppConfig, EnvMapping } from './types';

export abstract class BaseConfig<T extends keyof AppConfig> {
  protected abstract readonly envMapping: EnvMapping[T];
  protected abstract readonly config: AppConfig[T];

  protected getEnvValue(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  }

  protected validateNodeEnv(env: string): AppConfig['server']['nodeEnv'] {
    if (!['development', 'production', 'test'].includes(env)) {
      throw new Error(`Invalid NODE_ENV: ${env}`);
    }
    return env as AppConfig['server']['nodeEnv'];
  }

  protected validatePort(port: string): number {
    const portNumber = parseInt(port, 10);
    if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      throw new Error(`Invalid port number: ${port}`);
    }
    return portNumber;
  }

  protected validateLogLevel(level: string): AppConfig['logging']['level'] {
    if (!['error', 'warn', 'info', 'debug'].includes(level)) {
      throw new Error(`Invalid LOG_LEVEL: ${level}`);
    }
    return level as AppConfig['logging']['level'];
  }

  protected validateAllowedOrigins(origins: string): string[] {
    return origins.split(',').map((origin) => origin.trim());
  }

  public getConfig(): AppConfig[T] {
    return { ...this.config };
  }
}
