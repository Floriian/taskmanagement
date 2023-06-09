import { IsNumberString, IsOptional } from 'class-validator';

export class GetTeamMemberParamDto {
  @IsOptional()
  @IsNumberString()
  id?: string;
}
