import {
  Body,
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Param,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateTeamDto } from './dto/createam.dto';
import { User } from '../user/entity/user.entity';
import { GetUser } from '../decorators/getuser.decorator';
import { TeamGuard } from './guards/team.guard';

@Controller('team')
@UseGuards(JwtGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @UseGuards(TeamGuard)
  getUserTeam(@GetUser() user: User) {
    return this.teamService.getUserTeam(user);
  }

  @Get(':id')
  findOneTeam(@Param('id') id: string) {
    return this.teamService.findOneTeam(+id);
  }

  @Get('members')
  getUserTeamMembers() {
    return 'hello';
  }

  @Get('members/:id')
  getTeamMembers(@Param('id') id: string) {
    return this.teamService.getTeamMembers(+id);
  }

  @Post()
  createTeam(@GetUser() user: User, @Body() dto: CreateTeamDto) {
    return this.teamService.createTeam(dto, user);
  }

  @Post('join/:teamInviteCode')
  @HttpCode(HttpStatus.ACCEPTED)
  joinTeam(
    @GetUser() user: User,
    @Param('teamInviteCode') teamInviteCode: string,
  ) {
    return this.teamService.joinTeam(user, teamInviteCode);
  }

  @Delete('leave')
  @UseGuards(TeamGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  leaveTeam(@GetUser() user: User) {
    return this.teamService.leaveTeam(user);
  }
}
