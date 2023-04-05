import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team, TeamRepository } from './entity/team.entity';
import { CreateTeamDto } from './dto/createam.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team) private teamRepository: TeamRepository) {}

  async createTeam(dto: CreateTeamDto, user: User) {
    const isInTeam = await this.isInTeam(user);
    if (isInTeam)
      throw new UnauthorizedException('You are already a team member.');

    const teamCode = await this.generateTeamInviteCode();
    console.log(teamCode);

    const team = await this.teamRepository.create({
      teamInviteCode: teamCode,
      teamName: dto.teamName,
      users: [user],
    });

    try {
      await this.teamRepository.save(team);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('This team name is already taken.');
      } else {
        throw new InternalServerErrorException();
      }
    }

    delete team.users;

    return team;
  }

  async findOneTeam(id: number) {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team) throw new NotFoundException();
    return team;
  }

  async getTeamMembers(id: number) {
    const members = await this.teamRepository.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });

    let users: Array<Omit<User, 'password'>> = [];

    for (let user of members.users) {
      users.push({
        email: user.email,
        id: user.id,
        team: user.team,
        username: user.username,
      });
    }

    delete members.users;

    return {
      id: members.id,
      teamInviteCode: members.teamInviteCode,
      teamName: members.teamName,
      users,
    };
  }

  async joinTeam(user: User, teamInviteCode: string) {
    const team = await this.teamRepository.findOneBy({ teamInviteCode });
    if (!team) throw new BadRequestException('Invalid code.');

    team.users.push(user);

    try {
      await this.teamRepository.save(team);
    } catch (e) {
      console.log(e);
    }
  }

  async getUserTeam(user: User) {
    const team = await this.teamRepository.findOne({
      where: {
        users: {
          id: user.id,
        },
      },
    });

    if (!team) throw new NotFoundException();

    return team;
  }

  async isInTeam(user: User): Promise<boolean> {
    const team = await this.teamRepository.findOne({
      where: {
        users: {
          id: user.id,
        },
      },
    });
    if (team) return true;
    if (!team) return false;
  }

  generateTeamInviteCode(): string {
    const chars =
      'QWERTZUIOPASDFGHJKLYXCVBNMqwertzuiopasdfghjklyxcvbnm0123456789';
    let result: string = '';

    for (let i = 0; i <= 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * 6));
    }

    return result;
  }
}
