import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team, TeamRepository } from './entity/team.entity';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team) teamRepository: TeamRepository) {}
}
