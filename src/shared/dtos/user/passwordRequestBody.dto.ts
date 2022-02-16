import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PasswordRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
