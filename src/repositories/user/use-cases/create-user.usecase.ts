import { Inject, Injectable } from '@nestjs/common';
import { AddUserDto } from '../../../auth/dto/request-dto/add-user.dto';
import { User } from '../../models/user.model';
import { USER_REPOSITORY } from '../user.provider';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userModel: typeof User,
  ) {}

  public exec(user: AddUserDto): Promise<User> {
    return this.userModel.create(user, { raw: true });
  }
}
