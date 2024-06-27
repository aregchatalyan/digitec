import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(2, 100)
  title: string;

  @IsString()
  @Length(2, 500)
  description: string;

  @IsBoolean()
  status: boolean;
}
