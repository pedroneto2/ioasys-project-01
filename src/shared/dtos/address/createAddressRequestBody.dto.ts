import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsNumberString } from 'class-validator';

export class CreateAddressRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 150)
  public address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  public state: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 8)
  @IsNumberString()
  public zipCode: string;
}
