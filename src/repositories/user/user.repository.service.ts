import { Injectable } from '@nestjs/common';

import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserUseCase } from './use-cases/get-user-by-id.usecase';
import { User } from '../models/user.model';
import { AddUserDto } from '../../auth/dto/request-dto/add-user.dto';

@Injectable()
export class UserRepositoryService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  public createUser(user: AddUserDto): Promise<User> {
    return this.createUserUseCase.exec(user);
  }

  public getUser(user: Partial<User>): Promise<User> {
    return this.getUserUseCase.exec(user);
  }
}
