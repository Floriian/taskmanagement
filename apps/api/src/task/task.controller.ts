import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TeamGuard } from '../team/guards/team.guard';
import { User } from '../user/entity/user.entity';
import { GetUser } from '../decorators/getuser.decorator';
import { TeamService } from '../team/team.service';

@Controller('task')
@UseGuards(JwtGuard, TeamGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly teamService: TeamService,
  ) {}

  @Get()
  async getTasks(@GetUser() user: User) {
    const team = await this.teamService.getUserTeam(user);
    return this.taskService.getTasks(team.id);
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(+id);
  }
}
