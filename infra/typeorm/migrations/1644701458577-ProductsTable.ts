import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsTable1644701458577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE size_type AS ENUM ('GG','G','M','P','PP','Custom');
    CREATE TABLE Products (
        id varchar(255) PRIMARY KEY,
        name varchar(255) NOT NULL UNIQUE,
        type varchar(255) REFERENCES Product_Types(name),
        size size_type,
        description varchar(255),
        stock_count int,
        price DECIMAL(6,2),
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Products; DROP TYPE size_type');
  }
}
