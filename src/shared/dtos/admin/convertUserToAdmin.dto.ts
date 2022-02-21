import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, Length } from 'class-validator';

export class ConvertUserToAdminDTO {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  public userID: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  public password: string;

  @ApiProperty()
  @IsBoolean()
  public isAdmin: boolean;
}
