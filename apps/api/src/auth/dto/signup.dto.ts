import { IsNotEmpty, IsString, IsEmail, Min } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Min(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Min(6)
  confirmPassword: string;
}
