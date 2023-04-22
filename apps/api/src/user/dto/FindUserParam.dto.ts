import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserParamDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
