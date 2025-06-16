import { DataSource } from 'typeorm';
import { config as appConfig } from '../config/AppConfig';
import { Charity } from '../../domain/entities/Charity.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: appConfig.getEnvByPath('database.host'),
  port: appConfig.getEnvByPath('database.port'),
  username: appConfig.getEnvByPath('database.username'),
  password: appConfig.getEnvByPath('database.password'),
  database: appConfig.getEnvByPath('database.database'),
  entities: [Charity],
  migrations: [__dirname + '/../../migrations/**/*.ts'],
  synchronize: false,
});
