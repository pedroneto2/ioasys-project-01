import { createDecipheriv, createCipheriv } from 'crypto';
import envVariables from '@config/env';
import { User } from '@shared/entities/user/user.entity';

export class CryptoProvider {
  private readonly iv = Buffer.from(envVariables().ivHexKey, 'hex');
  private readonly crytpKey = envVariables().cryptoKey;

  decryptUser(user: User): User {
    const decryptedData = {
      fullName: this.decrypt(user.fullName),
      cpf: this.decrypt(user.cpf),
      address: this.decrypt(user.address),
      state: this.decrypt(user.state),
      zipCode: this.decrypt(user.zipCode),
    };
    return Object.assign(user, decryptedData);
  }

  decrypt(encryptedText: string): string {
    const decipher = createDecipheriv('aes-256-ctr', this.crytpKey, this.iv);
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);
    return decrpyted.toString();
  }

  encrypt(textToEncrypt: string): string {
    const cipher = createCipheriv('aes-256-ctr', this.crytpKey, this.iv);
    const encrypted = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return encrypted.toString('hex');
  }
}
