import { MigrationInterface, QueryRunner } from 'typeorm';
import envVariables from '@config/env';
import * as bcrypt from 'bcryptjs';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';
import { v4 as uuidV4 } from 'uuid';

const crypto = new CryptoProvider();

const adminID = envVariables().adminID || uuidV4();
const adminPassword = envVariables().adminPassword;
const adminEmail = crypto.encrypt(envVariables().adminEmail);

const adminFullName = envVariables().adminFullName || 'admin';
const adminCPF = envVariables().adminCPF || '00000000000';

const hashedPassword = bcrypt.hashSync(adminPassword);

export class CreateAdminUser1645039331848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO Users (id, full_name, cpf, email, password, admin, active) 
        VALUES ('${adminID}','${adminFullName}','${adminCPF}','${adminEmail}','${hashedPassword}','true','true');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM jwt_tokens WHERE user_id = '${adminID}';
       DELETE FROM orders_products A USING orders B WHERE A.order_id=B.id AND B.user_id = '${adminID}';
       DELETE FROM orders WHERE user_id = '${adminID}';
       DELETE FROM Users WHERE id='${adminID}';`,
    );
  }
}
