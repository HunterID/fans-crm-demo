import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { JwtSignOptionEnum } from './token.constants';

@Injectable()
export class TokenService {
  private [JwtSignOptionEnum.AccessToken]: JwtSignOptions;
  private [JwtSignOptionEnum.RefreshToken]: JwtSignOptions;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.configureJwtSignOptions();
  }

  private configureJwtSignOptions = () => {
    const { accessTokenSecret, accessTokenExpirationTime, refreshTokenSecret, refreshTokenExpirationTime } =
      this.configService.get('jwt');

    this[JwtSignOptionEnum.AccessToken] = {
      secret: accessTokenSecret,
      expiresIn: +accessTokenExpirationTime,
    };

    this[JwtSignOptionEnum.RefreshToken] = {
      secret: refreshTokenSecret,
      expiresIn: +refreshTokenExpirationTime,
    };
  };

  public composeAccessToken(userId: string): string {
    return this.composeToken(userId, JwtSignOptionEnum.AccessToken);
  }

  public composeRefreshToken(userId: string): string {
    return this.composeToken(userId, JwtSignOptionEnum.RefreshToken);
  }

  public composeToken(userId: string, jwtSignOptionsName: JwtSignOptionEnum): string {
    return this.jwtService.sign({ userId }, this[jwtSignOptionsName]);
  }

  public async composeTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return {
      accessToken: this.composeAccessToken(userId),
      refreshToken: this.composeRefreshToken(userId),
    };
  }
}
