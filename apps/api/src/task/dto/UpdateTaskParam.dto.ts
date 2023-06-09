import { IsNumberString, IsOptional } from 'class-validator';

export class UpdateTaskParamDto {
  @IsNumberString()
  @IsOptional()
  id?: string;
}
