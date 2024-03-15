import { Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { AddUserDto } from './dto/request-dto/add-user.dto';
import { UserRepositoryService } from '../repositories/user/user.repository.service';
import { TokenService } from './token/token.service';
import { AuthUserResponseDto } from './dto/response-dto/add-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly tokenService: TokenService,
  ) {}

  public async addUser(dto: AddUserDto): Promise<AuthUserResponseDto> {
    const { dataValues } = await this.userRepositoryService.createUser(dto);

    const tokens = await this.tokenService.composeTokens(dataValues.id);

    return plainToInstance(AuthUserResponseDto, { ...dataValues, ...tokens });
  }
}
