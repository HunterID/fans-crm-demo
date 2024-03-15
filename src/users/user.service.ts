import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserResponseDto } from './dto/responseDto/user-response.dto';
import { UserRepositoryService } from '../repositories/user/user.repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  public async getUser(id: string): Promise<UserResponseDto> {
    const user = await this.userRepositoryService.getUser({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserResponseDto, user.dataValues);
  }
}
