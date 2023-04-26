import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsISO8601,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  taskTitle: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsISO8601()
  deadline: Date;
}
