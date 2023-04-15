import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { User, UserRepository } from '../../user/entity/user.entity';

@Injectable()
/**
 * Check if user in team.
 */
export class TeamGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req: Express.Request = context.switchToHttp().getRequest();

    let result: boolean;

    const user = await this.userRepository.findOne({
      where: {
        email: req.user['email'],
      },
      relations: ['team'],
    });

    if (user.team) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }
}
