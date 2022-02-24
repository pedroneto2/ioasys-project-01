import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressessTable1645541130978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE Addressess (
            id varchar(255) PRIMARY KEY,
            user_id varchar(255) NOT NULL REFERENCES Users(id),
            address varchar(795) NOT NULL,
            state varchar(255) NOT NULL,
            zip_code varchar(24) NOT NULL
        );
        ALTER TABLE Users ADD CONSTRAINT fk_addressess_users FOREIGN KEY (default_address_id) REFERENCES Addressess (id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE Users DROP CONSTRAINT fk_addressess_users;
       DROP TABLE Addressess;`,
    );
  }
}
