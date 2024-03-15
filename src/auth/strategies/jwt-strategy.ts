import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ConfigService } from '@nestjs/config';
import { UserRepositoryService } from '../../repositories/user/user.repository.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const authHeader = request.headers?.authorization;

          return authHeader?.split(' ')[1];
        },
      ]),
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  async validate(payload: { userId: string }) {
    return this.userRepositoryService.getUser({ id: payload.userId });
  }
}
