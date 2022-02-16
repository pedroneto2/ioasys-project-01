import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class EditUserRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  @IsOptional()
  public fullName: string;

  @ApiProperty()
  @IsString()
  @Length(11, 11)
  @IsOptional()
  public cpf: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  public email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 50)
  @IsOptional()
  public address: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  @IsOptional()
  public state: string;

  @ApiProperty()
  @IsString()
  @Length(8, 8)
  @IsOptional()
  public zipCode: string;
}
