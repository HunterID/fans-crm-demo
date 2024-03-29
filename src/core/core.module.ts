import { Module } from '@nestjs/common';
import { SequelizeProvider } from './sequelize/sequelize.provider';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [SequelizeProvider],
  exports: [SequelizeProvider],
})
export class CoreModule {}
