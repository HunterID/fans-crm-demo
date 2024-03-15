import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { UserRepositoryModule } from '../../repositories/user/user-repository.module';

@Module({
  imports: [JwtModule.register({}), UserRepositoryModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
