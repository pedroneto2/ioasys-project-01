import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1644681447604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Users (
            id varchar(255) PRIMARY KEY,
            full_name varchar(255) NOT NULL,
            cpf varchar(11) NOT NULL UNIQUE,
            email varchar(255) NOT NULL UNIQUE,
            password varchar(255),
            address varchar(255) NOT NULL,
            state varchar(50) NOT NULL,
            zip_code varchar(8) NOT NULL,
            admin boolean DEFAULT false,
            active boolean DEFAULT true,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp 
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Users');
  }
}
