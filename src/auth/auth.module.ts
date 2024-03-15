import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

import { UserRepositoryModule } from '../repositories/user/user-repository.module';
import { TokenModule } from './token/token.module';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [TokenModule, UserRepositoryModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
