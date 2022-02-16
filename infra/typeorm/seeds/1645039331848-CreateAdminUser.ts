import { MigrationInterface, QueryRunner } from 'typeorm';
import envVariables from '@config/env';
import * as bcrypt from 'bcryptjs';

const adminID = envVariables().adminID;
const adminPassword = envVariables().adminPassword;
const adminEmail = envVariables().adminEmail;

const adminFullName = envVariables().adminFullName || 'admin';
const adminCPF = envVariables().adminCPF || '00000000000';
const adminAdress = envVariables().adminAdress || 'Admin street';
const adminState = envVariables().adminState || 'Admin state';
const adminZipCode = envVariables().adminZipCode || '00000000';

const hashedPassword = bcrypt.hashSync(adminPassword);

export class CreateAdminUser1645039331848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO Users (id, full_name, cpf, email, password, address, state, zip_code, admin, active) 
        VALUES ('${adminID}','${adminFullName}','${adminCPF}','${adminEmail}','${hashedPassword}','${adminAdress}','${adminState}','${adminZipCode}','true','true');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Users WHERE id='${adminID}';`);
  }
}
