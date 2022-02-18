import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  MaxLength,
} from 'class-validator';

export class LoginRequestBodyDTO {
  @ApiProperty()
  @IsEmail()
  @Length(3, 100)
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public password: number;
}
