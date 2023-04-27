import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskRepository } from './entity/task.entity';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { User } from '../user/entity/user.entity';
import { Team } from '../team/entity/team.entity';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: TaskRepository,
    private readonly teamService: TeamService,
    private readonly userService: UserService,
  ) {}

  async getTasks(id: number) {
    const tasks = await this.taskRepository.find({
      where: {
        team: {
          id,
        },
      },
    });
    return tasks;
  }

  async getTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
    });
    if (!task) throw new NotFoundException('No task found');
    return task;
  }

  async createTask(user: User, dto: CreateTaskDto): Promise<Task> {
    const currentDate = new Date().toISOString().split('T')[0];

    const currentUser = await this.userService.getUser(user);
    const userTeam = await this.teamService.getUserTeam(user);

    const task = await this.taskRepository.create({
      completed: false,
      createdAt: currentDate,
      deadline: dto.deadline,
      description: dto.description,
      taskTitle: dto.taskTitle,
      updatedAt: currentDate,
      createdBy: user.username,
      team: {
        id: userTeam.id,
      },
    });

    try {
      await this.taskRepository.save(task);
      return task;
    } catch (e) {
      console.log(e);
    }
  }

  async updateTask(id: number, teamId: number, dto: UpdateTaskDto) {
    const task = await this.getTask(id);

    const teamTasks = await this.getTasks(teamId);

    if (!teamTasks) {
      throw new BadRequestException();
    }

    const date = new Date().toISOString();

    try {
      const update = await this.taskRepository.update(task.id, {
        taskTitle: dto.taskTitle,
        completed: dto.completed,
        description: dto.description,
        deadline: dto.deadline,
        updatedAt: date,
      });
      if (update) {
        return {
          success: true,
        };
      }
    } catch (e) {
      console.log(e);
    }
  }
  async deleteTask(id: number, user: User): Promise<{ success: boolean }> {
    const userTeamTasks = await this.getTasks(user.id);

    await this.getTask(id);

    const parseId = userTeamTasks.map((t) => t.id === id);
    if (!parseId.length) throw new BadRequestException();

    const res = await this.taskRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('id = :id', { id })
      .execute();
    console.log(res);
    return { success: res ? res.affected > 0 : res.affected < 0 };
  }
}
