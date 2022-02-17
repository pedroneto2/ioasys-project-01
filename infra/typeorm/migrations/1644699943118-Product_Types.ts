import { MigrationInterface, QueryRunner } from 'typeorm';

export class Product_TypesTable1644699943118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Product_Types (
            type varchar(255) PRIMARY KEY,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp 
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Product_Types');
  }
}
