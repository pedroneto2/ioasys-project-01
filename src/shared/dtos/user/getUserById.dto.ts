import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class GetUserByIdDTO {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  public userID: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  public password: string;
}
