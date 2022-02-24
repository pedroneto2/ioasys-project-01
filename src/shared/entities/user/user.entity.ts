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
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { JwtToken } from '@shared/entities/jwtToken/jwtToken.entity';

@Entity('users')
@Unique(['email', 'cpf'])
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => JwtToken)
  @JoinColumn({ name: 'id', referencedColumnName: 'userID' })
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
  // typeorm can't direct retrieve values with FK link : 'https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining-relation'
  // Therfore, I decided to remove this one to one link from typeORM
  @Column({ name: 'default_address_id' })
  public defaultAddressID: string;

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
