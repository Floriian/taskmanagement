import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from './entity/user.entity';
import { UpdateUserDto } from './dto/updateuser.dto';
import { TypeORMError } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async getUser(user: User) {
    const findedUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
      relations: ['team'],
    });

    delete findedUser.password;
    const inTeam = findedUser.team !== null;
    delete findedUser.team;

    return {
      ...findedUser,
      inTeam,
    };
  }

  async findUser(username: string) {
    const findedUser = await this.userRepository.findOneBy({
      username,
    });
    if (!findedUser) throw new NotFoundException('User not found.');

    delete findedUser.password;

    const inTeam = findedUser.team !== null;

    return {
      ...findedUser,
      inTeam,
    };
  }

  async updateUser(user: User, dto: UpdateUserDto) {
    if (!Object.keys(dto).length)
      throw new BadRequestException('Update DTO is not provided.');
    try {
      const updatedUser = await this.userRepository.update(user.id, {
        email: dto.email,
        password: dto.password,
        team: dto.team,
        username: dto.username,
      });
      return this.getUser(user);
    } catch (e) {
      console.log(e);
    }
  }
}
