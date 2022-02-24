import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { Order } from '@shared/entities/order/order.entity';

@Entity('products_stamp')
export class ProductStamp {
  @ApiProperty()
  @PrimaryColumn()
  public id: string;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  public orderID: Order['id'];

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column()
  public type: string;

  @ApiProperty()
  @Column()
  public size: string;

  @ApiProperty()
  @Column()
  public description: string;

  @ApiProperty()
  @Column()
  public price: string;

  @ApiProperty()
  @Column()
  public quantity: string;

  @ApiProperty()
  @Column({ name: 'sub_total' })
  public subTotal: string;
}
