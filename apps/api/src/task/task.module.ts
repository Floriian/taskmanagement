import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Team } from '../team/entity/team.entity';
import { User } from '../user/entity/user.entity';
import { TeamModule } from '../team/team.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    TypeOrmModule.forFeature([Task, Team, User]),
    TeamModule,
    UserModule,
  ],
})
export class TaskModule {}
