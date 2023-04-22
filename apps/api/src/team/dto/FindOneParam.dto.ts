import { IsNumberString, IsOptional } from 'class-validator';

export class FindOneTeamParamDto {
  @IsNumberString()
  @IsOptional()
  teamId?: string;
}
