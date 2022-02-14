import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsTable1644701458577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE Products (
        id varchar(255) PRIMARY KEY,
        type varchar(50) NOT NULL,
        size varchar(50),
        description varchar(255),
        stock_id varchar(255) REFERENCES Stock(id),
        price int,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Products');
  }
}
