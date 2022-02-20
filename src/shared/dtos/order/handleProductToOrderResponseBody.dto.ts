import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class HandleProductToOrderResponseBodyDTO {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  public completed: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public message: string;
}
