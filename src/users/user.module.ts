import { Module } from '@nestjs/common';

import { UserRepositoryModule } from '../repositories/user/user-repository.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [UserRepositoryModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
