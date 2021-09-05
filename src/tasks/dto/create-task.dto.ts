import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  checked: boolean;

  @IsNotEmpty()
  @IsString()
  priority: string;
}
