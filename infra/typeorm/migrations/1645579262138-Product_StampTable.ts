import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductStampTable1645579262138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE products_stamp (
        id varchar(255) PRIMARY KEY,
        order_id varchar(255) REFERENCES orders(id),
        name varchar(255),
        type varchar(255),
        size varchar(150),
        description varchar(255),
        price varchar(150),
        quantity varchar(150),
        sub_total varchar(150)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE products_stamp;');
  }
}
