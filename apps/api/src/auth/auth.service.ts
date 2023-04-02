import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async signUp(dto: any) {
    return true;
  }

  async signIn(dto: any) {
    return true;
  }
}
