import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from './entity/user.entity';

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

    return findedUser;
  }
}
