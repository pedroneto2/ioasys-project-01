import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersProductsTable1644703551738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Orders_Products (
            id varchar(255) PRIMARY KEY,
            order_id varchar(255) REFERENCES Orders(id),
            product_id varchar(255) REFERENCES Products(id),
            quantity int DEFAULT 1
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Orders_Products');
  }
}
