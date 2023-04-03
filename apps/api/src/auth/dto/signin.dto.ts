import { IsNotEmpty, IsString, Min } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  credential: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
