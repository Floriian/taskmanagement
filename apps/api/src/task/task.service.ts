import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskRepository } from './entity/task.entity';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { User } from '../user/entity/user.entity';
import { Team } from '../team/entity/team.entity';

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
    if (!tasks.length) throw new NotFoundException('No tasks found.');
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
      team,
    });

    try {
      await this.taskRepository.save(task);
    } catch (e) {
      console.log(e);
    }

    return task;
  }
}
