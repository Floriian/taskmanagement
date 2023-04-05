import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRepository } from '../user/entity/user.entity';
import { SignUpDto } from './dto/signup.dto';
import * as argon2 from 'argon2';
import { SignInDto } from './dto/signin.dto';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const isConfirmMatches: boolean = dto.confirmPassword === dto.password;

    if (!isConfirmMatches)
      throw new BadRequestException("Passwords doesn't matches.");

    const hashPassword = await argon2.hash(dto.password);

    const user = await this.userRepository.create({
      email: dto.email,
      username: dto.username,
      password: hashPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Credentials are taken.');
      } else {
        throw new InternalServerErrorException();
      }
    }

    delete user.password;
    return this.signToken(user.id, user.username, user.email);
  }

  async signIn(dto: SignInDto) {
    const user = await this.userRepository.findOne({
      where: [{ username: dto.credential }, { email: dto.credential }],
    });

    if (!user) throw new NotFoundException("User doesn't exists.");

    const isPasswordMatches = await argon2.verify(user.password, dto.password);
    if (!isPasswordMatches)
      throw new BadRequestException("Password's doesnt matches.");

    return this.signToken(user.id, user.username, user.email);
  }

  async signToken(
    id: number,
    username: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const secret = await this.configService.get('JWT_SECRET');
    const payload = {
      sub: `${id}`,
      username,
      email,
    };
    const token = await this.jwt.sign(payload, {
      secret,
      expiresIn: '8h',
    });
    return {
      access_token: token,
    };
  }
}
