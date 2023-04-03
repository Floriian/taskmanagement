import { Controller, Get, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../decorators/getuser.decorator';

@Controller('team')
@UseGuards(JwtGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
}
