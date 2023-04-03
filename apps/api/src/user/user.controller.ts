import { Controller, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../decorators/getuser.decorator';
import { User } from './entity/user.entity';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return user;
  }
}
