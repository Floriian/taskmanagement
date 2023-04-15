import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskRepository } from './entity/task.entity';

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
      relations: ['team'],
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
}
