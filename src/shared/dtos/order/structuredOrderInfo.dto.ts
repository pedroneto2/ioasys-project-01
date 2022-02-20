import { OrderStatus } from '@shared/entities/order/orderStatus.enum';

export class StructuredOrderInfoDTO {
  public id: string;

  public status: OrderStatus;

  public address: string;

  public state: string;

  public zipCode: number;
}
