import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersTable1644699052792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE status_type AS ENUM ('concluded','shipping','payment_approved','request_done','request_in_progress');
        CREATE TABLE Orders (
            id varchar(255) PRIMARY KEY,
            user_id varchar(255) REFERENCES Users(id),
            status status_type,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Orders; DROP TYPE status_type');
  }
}
