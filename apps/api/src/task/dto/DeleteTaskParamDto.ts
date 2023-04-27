import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteTaskParamDto {
  @IsNumberString()
  @IsNotEmpty()
  id?: string;
}
