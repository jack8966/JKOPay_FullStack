import { AppConfig as AppConfigType } from './types';
import { ServerConfig } from './ServerConfig';
import { DatabaseConfig } from './DatabaseConfig';
import { LoggingConfig } from './LoggingConfig';
import { SecurityConfig } from './SecurityConfig';

type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? PathValue<T[K], R>
      : never
    : never;

export class AppConfig {
  private static instance: AppConfig;
  private readonly config: AppConfigType;

  private constructor() {
    this.config = {
      server: new ServerConfig().getConfig(),
      database: new DatabaseConfig().getConfig(),
      logging: new LoggingConfig().getConfig(),
      security: new SecurityConfig().getConfig(),
    };
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  public get<K extends keyof AppConfigType>(key: K): AppConfigType[K] {
    return this.config[key];
  }

  public getEnvByPath<P extends string>(path: P): PathValue<AppConfigType, P> {
    const keys = path.split('.');
    let current: any = this.config;

    for (const key of keys) {
      if (current === undefined || current === null) {
        return undefined as PathValue<AppConfigType, P>;
      }
      current = current[key];
    }

    return current as PathValue<AppConfigType, P>;
  }

  public getAll(): AppConfigType {
    return { ...this.config };
  }
}

export const config = AppConfig.getInstance();
