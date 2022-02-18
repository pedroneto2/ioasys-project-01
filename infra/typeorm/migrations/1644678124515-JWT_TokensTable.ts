import { MigrationInterface, QueryRunner } from 'typeorm';

export class JwtTokens1644678124515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE JWT_Tokens (
            user_id varchar(255) PRIMARY KEY REFERENCES Users(id),
            JWT_TOKEN varchar(255) UNIQUE,
            REFRESH_TOKEN varchar(255) UNIQUE
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE JWT_Tokens');
  }
}
