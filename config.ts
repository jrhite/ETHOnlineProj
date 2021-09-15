import * as dotenv from 'dotenv';
import * as envvar from 'env-var';

export interface Config {
  readonly PORT: number;
}

let _config: Config;

class SingletonConfig implements Config {
  PORT: number;

  constructor(options?: dotenv.DotenvConfigOptions) {
    this.loadConfig(options);
    this.validateConfig();
  }

  private loadConfig(options?: dotenv.DotenvConfigOptions): void {
    const configOutput = dotenv.config(options);

    if (configOutput.error) {
      throw configOutput.error;
    }
  }

  private validateConfig(): void {
    this.PORT = envvar.get('PORT').required().asIntPositive();
  }
}

export function loadConfig(
  options?: string | dotenv.DotenvConfigOptions
): Config {
  if (_config) {
    throw 'config may only be loaded once';
  }

  if (typeof options === 'string') {
    options = { path: options };
  }

  _config = new SingletonConfig(options);

  return _config;
}

export function config(): Config {
  if (!_config) {
    throw 'config has not yet been loaded';
  }

  return _config;
}
