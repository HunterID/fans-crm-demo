import { Exclude, Expose } from 'class-transformer';
import { UserResponseDto } from '../../../users/dto/responseDto/user-response.dto';

@Exclude()
export class AuthUserResponseDto extends UserResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
