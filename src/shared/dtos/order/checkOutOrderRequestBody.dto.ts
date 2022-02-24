import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CheckOutOrderRequestBody {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public providedAddressID: string;
}
