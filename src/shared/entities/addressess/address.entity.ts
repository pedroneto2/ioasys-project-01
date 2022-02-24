import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '@shared/entities/user/user.entity';

@Entity('addressess')
@Unique(['userID', 'address', 'state', 'zipCode'])
export class Address {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public userID: string;

  @ApiProperty()
  @Column()
  public address: string;

  @ApiProperty()
  @Column()
  public state: string;

  @ApiProperty()
  @Column({ name: 'zip_code' })
  public zipCode: string;
}
