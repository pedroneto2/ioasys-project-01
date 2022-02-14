import { MigrationInterface, QueryRunner } from 'typeorm';

export class StockTable1644699943118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Stock (
            id varchar(255) PRIMARY KEY,
            quantity int,
            active boolean NOT NULL,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Stock');
  }
}
