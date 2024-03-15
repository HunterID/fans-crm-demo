import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { models } from './models';

export const SEQUELIZE_PROVIDER = 'SEQUELIZE_PROVIDER';

const sequelizeFactory = async (configService: ConfigService): Promise<Sequelize> => {
  const { dialect, host, port, username, password, database } = configService.get('mysql');

  const sequelize = new Sequelize({
    dialect,
    host,
    port,
    username,
    password,
    database,
  });

  sequelize.addModels(models);

  return sequelize;
};

export const SequelizeProvider: Provider = {
  useFactory: sequelizeFactory,
  inject: [ConfigService],
  provide: SEQUELIZE_PROVIDER,
};
