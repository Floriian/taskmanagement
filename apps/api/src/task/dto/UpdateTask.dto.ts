import {
  IsBoolean,
  IsDate,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  taskTitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsOptional()
  @IsISO8601()
  deadline: Date;
}
