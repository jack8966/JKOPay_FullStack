import { BaseConfig } from './BaseConfig';
import { AppConfig, EnvMapping } from './types';

export class ServerConfig extends BaseConfig<'server'> {
  protected readonly envMapping: EnvMapping['server'] = {
    nodeEnv: 'NODE_ENV',
    port: 'PORT',
  };

  protected readonly config: AppConfig['server'] = {
    nodeEnv: this.validateNodeEnv(this.getEnvValue(this.envMapping.nodeEnv)),
    port: this.validatePort(this.getEnvValue(this.envMapping.port)),
  };
}
