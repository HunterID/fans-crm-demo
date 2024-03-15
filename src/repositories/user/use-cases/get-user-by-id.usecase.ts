import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';

import { USER_REPOSITORY } from '../user.provider';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userModel: typeof User,
  ) {}

  public exec(user: Partial<User>): Promise<User> {
    return this.userModel.findOne({ where: user });
  }
}
