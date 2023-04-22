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
import { FindOneTeamParamDto } from './dto/FindOneParam.dto';
import { JoinTeamParamDto } from './dto/JoinTeamParam.dto';
import { GetTeamMemberParamDto } from './dto/GetTeamMemberParam.dto';

@Controller('team')
@UseGuards(JwtGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @UseGuards(TeamGuard)
  getUserTeam(@GetUser() user: User) {
    return this.teamService.getUserTeam(user);
  }

  @Get(':teamId')
  findOneTeam(@Param() param: FindOneTeamParamDto) {
    return this.teamService.findOneTeam(+param.teamId);
  }

  @Get('members/:id')
  getTeamMembers(@Param() param: GetTeamMemberParamDto) {
    return this.teamService.getTeamMembers(+param.id);
  }

  @Post()
  createTeam(@GetUser() user: User, @Body() dto: CreateTeamDto) {
    return this.teamService.createTeam(dto, user);
  }

  @Post('join/:teamInviteCode')
  @HttpCode(HttpStatus.ACCEPTED)
  joinTeam(@GetUser() user: User, @Param() param: JoinTeamParamDto) {
    return this.teamService.joinTeam(user, param.teamInviteCode);
  }

  @Delete('leave')
  @UseGuards(TeamGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  leaveTeam(@GetUser() user: User) {
    return this.teamService.leaveTeam(user);
  }
}
