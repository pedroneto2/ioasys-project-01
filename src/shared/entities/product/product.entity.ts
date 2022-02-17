import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Product_Types } from '@shared/entities/product_types/product_types.entity';
import { ProducstSize } from '@shared/entities/product/productsSize.enum';

@Entity('products')
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public stock_count: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ProducstSize,
  })
  public size: ProducstSize;

  @ApiProperty()
  @Column()
  public description: string;

  @ApiProperty()
  @Column()
  public price: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  @ManyToOne(() => Product_Types)
  @JoinColumn({ name: 'type' })
  type: Product_Types;
}
