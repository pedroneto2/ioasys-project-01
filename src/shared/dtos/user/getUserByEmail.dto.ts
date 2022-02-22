import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class GetUserByEmailDTO {
  @ApiProperty()
  @IsEmail()
  @Length(3, 200)
  public email: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  public password: string;
}
