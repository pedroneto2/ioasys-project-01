import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { ProductType } from '@shared/entities/productType/productType.entity';
import { ProductsSize } from '@shared/entities/product/productsSize.enum';

@Entity('products')
@Unique(['name'])
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column({ name: 'stock_count' })
  public stockCount: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ProductsSize,
  })
  public size: ProductsSize;

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

  @ManyToOne(() => ProductType)
  @JoinColumn({ name: 'type' })
  type: ProductType['name'];
}
