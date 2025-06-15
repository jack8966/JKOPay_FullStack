import { BaseConfig } from './BaseConfig';
import { AppConfig, EnvMapping } from './types';

export class LoggingConfig extends BaseConfig<'logging'> {
  protected readonly envMapping: EnvMapping['logging'] = {
    level: 'LOG_LEVEL',
  };

  protected readonly config: AppConfig['logging'] = {
    level: this.validateLogLevel(this.getEnvValue(this.envMapping.level)),
  };
}
