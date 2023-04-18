import { Controller, UseGuards, Get, Patch, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../decorators/getuser.decorator';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return this.userService.getUser(user);
  }

  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.userService.findUser(username);
  }

  @Patch()
  updateUser(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(user, dto);
  }
}
