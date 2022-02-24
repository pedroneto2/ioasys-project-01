import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '@shared/entities/user/user.entity';
import { OrderStatus } from '@shared/entities/order/orderStatus.enum';

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  public status: OrderStatus;

  @ApiProperty()
  @Column({ name: 'client_name' })
  public clientName: string;

  @ApiProperty()
  @Column({ name: 'client_cpf' })
  public clientCPF: string;

  @ApiProperty()
  @Column()
  public price: string;

  @ApiProperty()
  @Column()
  public address: string;

  @ApiProperty()
  @Column()
  public state: string;

  @ApiProperty()
  @Column({ name: 'zip_code' })
  public zipCode: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userID: User['id'];
}
