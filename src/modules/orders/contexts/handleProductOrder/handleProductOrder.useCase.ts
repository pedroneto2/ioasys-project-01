import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { notFound, requestNotCompleted } from '@shared/constants/errors';

import { HandleProductToOrderResponseBodyDTO } from '@shared/dtos/order/handleProductToOrderResponseBody.dto';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductRepository } from '@modules/products/repository/product.repository';

import { OrderStatus } from '@shared/entities/order/orderStatus.enum';

@Injectable()
export class HandleProductToOrderUseCase {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async handleProductToOrder(
    userID: string,
    productID: string,
    addOrRemove: number,
  ): Promise<HandleProductToOrderResponseBodyDTO> {
    const productCount = await this.checkProductStock(productID);
    const newStockCount = productCount - addOrRemove;
    if (!productCount && addOrRemove > 0) {
      return { completed: false, message: 'Product out of stock' };
    }
    if (newStockCount < 0) {
      return {
        completed: false,
        message:
          'Product quantity unavaible. Avaible quantity: ' + productCount,
      };
    }
    const orderID = await this.createOrUpdateOrder(userID);
    const productBalance = await this.createOrUpdateOrderProduct(
      orderID,
      productID,
      addOrRemove,
    );
    // the maximum to be restored is the quantity user owns
    const productNewStock = productCount + productBalance;
    await this.updateProductStock(productID, productNewStock);
    return { completed: true, message: 'successfully' };
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  private async createOrUpdateOrder(userID: string): Promise<string> {
    const orderInProgress = await this.orderRepository.findOrderInProgress(
      userID,
    );
    const id = orderInProgress?.id || uuidV4();
    const status = OrderStatus.REQUEST_IN_PROGRESS;
    const order = await this.orderRepository.createOrder({
      id,
      userID,
      status,
    });
    if (!order) {
      throw new ConflictException(
        requestNotCompleted('createOrUpdateOrder:addProductToOrder'),
      );
    }
    return id;
  }

  private async createOrUpdateOrderProduct(
    orderID: string,
    productID: string,
    addOrRemove: number,
  ): Promise<number> {
    const orderProductFromOrder =
      await this.orderProductRepository.findOrderProductByOrderIdAndProductId(
        orderID,
        productID,
      );
    const currentQuantity = orderProductFromOrder
      ? orderProductFromOrder.quantity
      : 0;
    const quantity = Math.max(0, currentQuantity + addOrRemove);
    const id = orderProductFromOrder?.id || uuidV4();
    let orderProduct;
    if (!quantity) {
      // if quantity reachs 0, delete the orderProduct
      orderProduct =
        await this.orderProductRepository.deleteOrderProductByOrderIdAndProductId(
          orderID,
          productID,
        );
    } else {
      orderProduct =
        await this.orderProductRepository.createOrUpdateOrderProduct({
          id,
          orderID,
          productID,
          quantity,
        });
    }
    if (!orderProduct) {
      throw new ConflictException(
        requestNotCompleted('createOrUpdateOrderProduct:addProductToOrder'),
      );
    }
    return currentQuantity - quantity;
  }

  private async checkProductStock(productID: string): Promise<number> {
    const product = await this.productRepository.checkProductStock(productID);
    if (!product) {
      throw new ConflictException(notFound('Product'));
    }
    return product.stockCount;
  }

  private async updateProductStock(
    productID: string,
    newStockCount: number,
  ): Promise<void> {
    const updatedStockCount = await this.productRepository.updateProductStock(
      productID,
      newStockCount,
    );
    if (!updatedStockCount) {
      throw new ConflictException(
        requestNotCompleted('updateProductStock:handleProductOrderUseCase'),
      );
    }
  }
}
