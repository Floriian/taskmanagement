import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/team.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';

@Module({
  controllers: [TeamController],
  providers: [TeamService, UserService],
  imports: [TypeOrmModule.forFeature([Team, User]), UserModule],
})
export class TeamModule {}
