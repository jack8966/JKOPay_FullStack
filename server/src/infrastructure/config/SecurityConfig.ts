import { BaseConfig } from './BaseConfig';
import { AppConfig, EnvMapping } from './types';

export class SecurityConfig extends BaseConfig<'security'> {
  protected readonly envMapping: EnvMapping['security'] = {
    allowedOrigins: 'ALLOWED_ORIGINS',
  };

  protected readonly config: AppConfig['security'] = {
    allowedOrigins: this.validateAllowedOrigins(this.getEnvValue(this.envMapping.allowedOrigins)),
  };
}
