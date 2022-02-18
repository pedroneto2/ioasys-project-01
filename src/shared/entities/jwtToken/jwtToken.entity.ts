import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, Unique, PrimaryColumn } from 'typeorm';

@Entity('jwt_tokens')
@Unique(['jwtToken', 'refreshToken'])
export class JwtToken {
  @ApiProperty()
  @PrimaryColumn({ name: 'user_id' })
  public userID: string;

  @ApiProperty()
  @Column({ name: 'jwt_token' })
  public jwtToken: string;

  @ApiProperty()
  @Column({ name: 'refresh_token' })
  public refreshToken: string;
}
