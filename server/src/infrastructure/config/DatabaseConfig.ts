import { BaseConfig } from './BaseConfig';
import { AppConfig, EnvMapping } from './types';
import { EnvConfig } from './EnvConfig';

export class DatabaseConfig extends BaseConfig<'database'> {
  private readonly envConfig = EnvConfig.getInstance();

  protected readonly envMapping: EnvMapping['database'] = {
    host: 'DB_HOST',
    port: 'DB_PORT',
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE',
  };

  protected readonly config: AppConfig['database'] = {
    host: this.envConfig.getEnvValue(this.envMapping.host),
    port: this.envConfig.validatePort(this.envConfig.getEnvValue(this.envMapping.port)),
    username: this.envConfig.getEnvValue(this.envMapping.username),
    password: this.envConfig.getEnvValue(this.envMapping.password),
    database: this.envConfig.getEnvValue(this.envMapping.database),
  };
}
