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
  @Matches(PASSWORD_REGEX, { message: 'password-is-too-weak' })
  public password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  public address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  @IsNumberString()
  public zipCode: string;
}
