import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';

@Entity('orders_products')
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public quantity: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  orderID: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  productID: Product;
}
