import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, NotEquals, IsInt } from 'class-validator';

export class HandleProductToOrderRequestBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public itemID: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @NotEquals(0)
  public addOrRemove: number;
}
