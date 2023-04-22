import { IsString, MaxLength, MinLength } from 'class-validator';

export class JoinTeamParamDto {
  @IsString()
  @MinLength(7)
  @MaxLength(7)
  teamInviteCode: string;
}
