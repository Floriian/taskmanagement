import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TeamGuard } from '../team/guards/team.guard';
import { User } from '../user/entity/user.entity';
import { GetUser } from '../decorators/getuser.decorator';
import { TeamService } from '../team/team.service';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';

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

  @Post()
  createTask(@GetUser() user: User, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(user, dto);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    const { id: teamId } = await this.teamService.getUserTeam(user);
    return this.taskService.updateTask(+id, teamId, dto);
  }
}
