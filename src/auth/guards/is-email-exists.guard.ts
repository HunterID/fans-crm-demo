import { BadRequestException, CanActivate, ExecutionContext, Global, Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../../repositories/user/user.repository.service';

@Global()
@Injectable()
export class IsEmailExists implements CanActivate {
  constructor(private userRepositoryService: UserRepositoryService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request.body;

    if (email) await this.isUserExistInSystem(email);

    return true;
  }

  private async isUserExistInSystem(email: string): Promise<void> {
    const user = await this.userRepositoryService.getUser({ email });

    if (user) throw new BadRequestException('Email already exists');
  }
}
