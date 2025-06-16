import { BaseConfig } from './BaseConfig';
import { AppConfig, EnvMapping } from './types';

export class SecurityConfig extends BaseConfig<'security'> {
  protected readonly envMapping: EnvMapping['security'] = {
    allowedOrigins: 'ALLOWED_ORIGINS',
    rateLimitWindowMs: 'RATE_LIMIT_WINDOW_MS',
    rateLimitMax: 'RATE_LIMIT_MAX',
  };

  protected readonly config: AppConfig['security'] = {
    allowedOrigins: this.validateAllowedOrigins(this.getEnvValue(this.envMapping.allowedOrigins)),
    rateLimitWindowMs: this.getEnvValue(this.envMapping.rateLimitWindowMs),
    rateLimitMax: this.getEnvValue(this.envMapping.rateLimitMax),
  };
}
