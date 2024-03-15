import { Module } from '@nestjs/common';

import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserUseCase } from './use-cases/get-user-by-id.usecase';
import { UserRepositoryService } from './user.repository.service';
import { usersProviders } from './user.provider';

@Module({
  providers: [UserRepositoryService, CreateUserUseCase, GetUserUseCase, ...usersProviders],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
