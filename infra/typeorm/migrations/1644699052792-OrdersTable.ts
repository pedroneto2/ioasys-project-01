import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersTable1644699052792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Orders (
            id varchar(255) PRIMARY KEY,
            user_id varchar(255) REFERENCES Users(id),
            status varchar(11) NOT NULL,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp 
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Orders');
  }
}
