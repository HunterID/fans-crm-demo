import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponseDto } from './dto/responseDto/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'get-user by id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('get-user/:id')
  public getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUser(id);
  }
}
