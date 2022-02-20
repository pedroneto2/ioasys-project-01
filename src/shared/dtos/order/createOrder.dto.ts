import { OrderStatus } from '@shared/entities/order/orderStatus.enum';
import { User } from '@shared/entities/user/user.entity';

export class CreateOrderDTO {
  public id: string;

  public userID: User['id'];

  public status: OrderStatus;
}
