import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '@shared/entities/order/order.entity';
import { Product } from '@shared/entities/product/product.entity';

@Entity('orders_products')
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public quantity: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  orderID: Order['id'];

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  productID: Product['id'];
}
