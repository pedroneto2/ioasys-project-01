import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
@Unique(['email', 'cpf'])
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ name: 'full_name' })
  public fullName: string;

  @ApiProperty()
  @Column()
  public cpf: string;

  @ApiProperty()
  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

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
  @Column()
  public admin: boolean;

  @ApiProperty()
  @Column()
  public active: boolean;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  // @ApiProperty()
  // @ManyToMany(() => Terms)
  // @JoinTable({
  //   name: 'terms_users',
  //   joinColumns: [{ name: 'user_id' }],
  //   inverseJoinColumns: [{ name: 'term_id' }],
  // })
  // terms: Terms[];
}
