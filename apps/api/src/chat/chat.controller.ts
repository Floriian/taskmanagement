import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../decorators/getuser.decorator';
import { User } from '../user/entity/user.entity';
import { ChatService } from './chat.service';
import { TeamGuard } from '../team/guards/team.guard';

@Controller('/chat')
@UseGuards(JwtGuard, TeamGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getTeamMessages(@GetUser() user: User) {
    return this.chatService.getTeamMessages(user);
  }
}
