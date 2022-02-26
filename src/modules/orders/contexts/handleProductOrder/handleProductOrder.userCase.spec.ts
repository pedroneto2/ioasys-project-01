import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductRepository } from '@modules/products/repository/product.repository';

import { HandleProductToOrderUseCase } from './handleProductOrder.useCase';
import { useCases, useCasesErrors } from './utils';

describe('HandleProductToOrderUseCase', () => {
  let service: HandleProductToOrderUseCase;

  const mockOrderRepository = {
    findOrderInProgress: jest.fn(),
    createOrder: jest.fn(),
  };

  const mockOrderProductRepository = {
    findOrderProductByOrderIdAndProductId: jest.fn(),
    deleteOrderProductByOrderIdAndProductId: jest.fn(),
    createOrUpdateOrderProduct: jest.fn(),
  };

  const mockProductRepository = {
    checkProductStock: jest.fn(),
    updateProductStock: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HandleProductToOrderUseCase,
        {
          provide: getRepositoryToken(OrderRepository),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(OrderProductRepository),
          useValue: mockOrderProductRepository,
        },
        {
          provide: getRepositoryToken(ProductRepository),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<HandleProductToOrderUseCase>(
      HandleProductToOrderUseCase,
    );
  });

  beforeEach(() => {
    mockOrderRepository.findOrderInProgress.mockReset();
    mockOrderRepository.createOrder.mockReset();
    mockOrderProductRepository.findOrderProductByOrderIdAndProductId.mockReset();
    mockOrderProductRepository.deleteOrderProductByOrderIdAndProductId.mockReset();
    mockOrderProductRepository.createOrUpdateOrderProduct.mockReset();
    mockProductRepository.checkProductStock.mockReset();
    mockProductRepository.updateProductStock.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When handling products to order', () => {
    for (let i = 0; i < useCases.checkProductStock.length; i++) {
      it(useCases.it[i], async () => {
        mockProductRepository.checkProductStock.mockReturnValue(
          useCases.checkProductStock[i],
        );
        mockOrderRepository.findOrderInProgress.mockReturnValue(
          useCases.findOrderInProgress[i],
        );
        mockOrderRepository.createOrder.mockReturnValue(
          useCases.createOrder[i],
        );
        mockOrderProductRepository.findOrderProductByOrderIdAndProductId.mockReturnValue(
          useCases.findOrderProductByOrderIdAndProductId[i],
        );
        mockOrderProductRepository.deleteOrderProductByOrderIdAndProductId.mockReturnValue(
          useCases.deleteOrderProductByOrderIdAndProductId[i],
        );
        mockOrderProductRepository.createOrUpdateOrderProduct.mockReturnValue(
          useCases.createOrUpdateOrderProduct[i],
        );
        mockProductRepository.updateProductStock.mockReturnValue(
          useCases.updateProductStock[i],
        );
        const response = await service.handleProductToOrder(
          useCases.handleProductToOrder[i].userID,
          useCases.handleProductToOrder[i].productID,
          useCases.handleProductToOrder[i].addOrRemove,
        );
        expect(response).toStrictEqual(useCases.response[i]);
        expect(mockProductRepository.checkProductStock).toHaveBeenCalledTimes(
          useCases.checkProductStockCallNumber[i],
        );
        expect(mockOrderRepository.findOrderInProgress).toHaveBeenCalledTimes(
          useCases.findOrderInProgressCallNumber[i],
        );
        expect(mockOrderRepository.createOrder).toHaveBeenCalledTimes(
          useCases.createOrderCallNumber[i],
        );
        expect(
          mockOrderProductRepository.findOrderProductByOrderIdAndProductId,
        ).toHaveBeenCalledTimes(
          useCases.findOrderProductByOrderIdAndProductIdCallNumber[i],
        );
        expect(
          mockOrderProductRepository.deleteOrderProductByOrderIdAndProductId,
        ).toHaveBeenCalledTimes(
          useCases.deleteOrderProductByOrderIdAndProductIdCallNumber[i],
        );
        expect(
          mockOrderProductRepository.createOrUpdateOrderProduct,
        ).toHaveBeenCalledTimes(
          useCases.createOrUpdateOrderProductCallNumber[i],
        );
        expect(mockProductRepository.updateProductStock).toHaveBeenCalledTimes(
          useCases.updateProductStockCallNumber[i],
        );
      });
    }

    for (let j = 0; j < useCasesErrors.checkProductStock.length; j++) {
      it(useCasesErrors.it[j], async () => {
        mockProductRepository.checkProductStock.mockReturnValue(
          useCasesErrors.checkProductStock[j],
        );
        mockOrderRepository.findOrderInProgress.mockReturnValue(
          useCasesErrors.findOrderInProgress[j],
        );
        mockOrderRepository.createOrder.mockReturnValue(
          useCasesErrors.createOrder[j],
        );
        mockOrderProductRepository.findOrderProductByOrderIdAndProductId.mockReturnValue(
          useCasesErrors.findOrderProductByOrderIdAndProductId[j],
        );
        mockOrderProductRepository.deleteOrderProductByOrderIdAndProductId.mockReturnValue(
          useCasesErrors.deleteOrderProductByOrderIdAndProductId[j],
        );
        mockOrderProductRepository.createOrUpdateOrderProduct.mockReturnValue(
          useCasesErrors.createOrUpdateOrderProduct[j],
        );
        mockProductRepository.updateProductStock.mockReturnValue(
          useCasesErrors.updateProductStock[j],
        );
        await service
          .handleProductToOrder(
            useCasesErrors.handleProductToOrder[j].userID,
            useCasesErrors.handleProductToOrder[j].productID,
            useCasesErrors.handleProductToOrder[j].addOrRemove,
          )
          .catch((e) => {
            expect(e).toBeInstanceOf(ConflictException);
            expect(e).toMatchObject({
              message: useCasesErrors.responseMessage[j],
            });
          });
        expect(mockProductRepository.checkProductStock).toHaveBeenCalledTimes(
          useCasesErrors.checkProductStockCallNumber[j],
        );
        expect(mockOrderRepository.findOrderInProgress).toHaveBeenCalledTimes(
          useCasesErrors.findOrderInProgressCallNumber[j],
        );
        expect(mockOrderRepository.createOrder).toHaveBeenCalledTimes(
          useCasesErrors.createOrderCallNumber[j],
        );
        expect(
          mockOrderProductRepository.findOrderProductByOrderIdAndProductId,
        ).toHaveBeenCalledTimes(
          useCasesErrors.findOrderProductByOrderIdAndProductIdCallNumber[j],
        );
        expect(
          mockOrderProductRepository.deleteOrderProductByOrderIdAndProductId,
        ).toHaveBeenCalledTimes(
          useCasesErrors.deleteOrderProductByOrderIdAndProductIdCallNumber[j],
        );
        expect(
          mockOrderProductRepository.createOrUpdateOrderProduct,
        ).toHaveBeenCalledTimes(
          useCasesErrors.createOrUpdateOrderProductCallNumber[j],
        );
        expect(mockProductRepository.updateProductStock).toHaveBeenCalledTimes(
          useCasesErrors.updateProductStockCallNumber[j],
        );
      });
    }
  });
});
