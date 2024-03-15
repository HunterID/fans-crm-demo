import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { AddUserDto } from './dto/request-dto/add-user.dto';
import { AuthUserResponseDto } from './dto/response-dto/add-user-response.dto';
import { IsEmailExists } from './guards/is-email-exists.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'add-user' })
  @UseGuards(IsEmailExists)
  @Post('add-user')
  public addUser(@Body() dto: AddUserDto): Promise<AuthUserResponseDto> {
    return this.authService.addUser(dto);
  }
}
