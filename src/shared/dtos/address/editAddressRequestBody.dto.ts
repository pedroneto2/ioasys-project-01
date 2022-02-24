import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumberString, IsOptional } from 'class-validator';

export class EditAddressRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(5, 150)
  public addressID: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(5, 150)
  public address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(2, 50)
  public state: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  @Length(8, 8)
  public zipCode: string;
}
