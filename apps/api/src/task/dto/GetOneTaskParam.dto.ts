import { IsNumberString, IsOptional } from 'class-validator';

export class GetOneTaskParamDto {
  @IsNumberString()
  @IsOptional()
  id: string;
}
