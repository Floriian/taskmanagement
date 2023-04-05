import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Team } from '../../team/entity/team.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsOptional()
  team: Team;
}
