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

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: TaskRepository) {}

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

  //Todo with dates. maybe moment.js
  async createTask(user: User, team: Team, dto: CreateTaskDto) {
    const task = await this.taskRepository.create({
      completed: false,
      createdAt: '2001-12-21',
      deadline: '2001-12-21',
      description: dto.description,
      taskTitle: dto.taskTitle,
      updatedAt: '2001-12-21',
    });

    try {
      await this.taskRepository.save(task);
    } catch (e) {
      console.log(e);
    }

    return task;
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
}
