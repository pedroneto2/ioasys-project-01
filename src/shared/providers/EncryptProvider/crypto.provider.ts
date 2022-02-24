import { createDecipheriv, createCipheriv } from 'crypto';
import envVariables from '@config/env';
import { User } from '@shared/entities/user/user.entity';
import { Address } from '@shared/entities/addressess/address.entity';
import { Order } from '@shared/entities/order/order.entity';

export class CryptoProvider {
  private readonly iv = Buffer.from(envVariables().ivHexKey, 'hex');
  private readonly crytpKey = envVariables().cryptoKey;

  decryptOrder(order: Order): Order {
    const decryptedData = {
      clientName: this.decrypt(order.clientName),
      clientCPF: this.decrypt(order.clientCPF),
      price: this.decrypt(order.price),
      address: this.decrypt(order.address),
      state: this.decrypt(order.state),
      zipCode: this.decrypt(order.zipCode),
    };
    return Object.assign(order, decryptedData);
  }

  decryptAddress(address: Address): Address {
    const decryptedData = {
      address: this.decrypt(address.address),
      state: this.decrypt(address.state),
      zipCode: this.decrypt(address.zipCode),
    };
    return Object.assign(address, decryptedData);
  }

  decryptUser(user: User): User {
    const decryptedData = {
      fullName: this.decrypt(user.fullName),
      cpf: this.decrypt(user.cpf),
      email: this.decrypt(user.email),
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
