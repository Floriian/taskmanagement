import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat, ChatRepository } from './entities/chat.entity';
import { User, UserRepository } from '../user/entity/user.entity';
import { TeamService } from '../team/team.service';
import { Team, TeamRepository } from '../team/entity/team.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: ChatRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Team) private readonly teamRepository: TeamRepository,
    private readonly teamService: TeamService,
    private readonly userService: UserService,
  ) {}

  async getTeamMessages(user: User) {
    const userTeam = await this.teamService.getUserTeam(user);
    if (!userTeam) throw new UnauthorizedException('You are not in team.');

    const messages = await this.chatRepository.find({
      where: [{ team: { id: userTeam.id } }],
      relations: ['user'],
      select: {
        user: {
          username: true,
          email: true,
          id: true,
        },
      },
    });

    return messages;
  }

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
