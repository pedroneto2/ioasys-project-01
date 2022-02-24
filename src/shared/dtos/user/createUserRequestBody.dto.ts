import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsNumberString,
} from 'class-validator';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*=(+){}|'";\\:[><.\],?/-]).{8,}$/;

export class CreateUserRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  public fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  @IsNumberString()
  public cpf: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  @Matches(PASSWORD_REGEX, { message: 'password-is-too-weak' })
  public password: string;
}
