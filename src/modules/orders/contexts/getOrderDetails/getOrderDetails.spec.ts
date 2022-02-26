import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductStampRepository } from '@modules/orders/repositories/productStamp.repository';

import { GetOrderDetailsUseCase } from './getOrderDetails.useCase';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

describe('HandleProductToOrderUseCase', () => {
  let service: GetOrderDetailsUseCase;

  const mockOrderRepository = {
    getUserOrdersInfo: jest.fn(),
  };

  const mockOrderProductRepository = {
    getUserOrderDetailsInProgress: jest.fn(),
  };

  const mockProductStampRepository = {
    retrieveProductStampsFromOrder: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrderDetailsUseCase,
        CryptoProvider,
        {
          provide: 'CRYPTO_PROVIDER',
          useExisting: CryptoProvider,
        },
        {
          provide: getRepositoryToken(OrderRepository),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(OrderProductRepository),
          useValue: mockOrderProductRepository,
        },
        {
          provide: getRepositoryToken(ProductStampRepository),
          useValue: mockProductStampRepository,
        },
      ],
    }).compile();

    service = module.get<GetOrderDetailsUseCase>(GetOrderDetailsUseCase);
  });

  beforeEach(() => {
    mockOrderRepository.getUserOrdersInfo.mockReset();
    mockOrderProductRepository.getUserOrderDetailsInProgress.mockReset();
    mockProductStampRepository.retrieveProductStampsFromOrder.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When getting order details', () => {
    it('should return structured order products', async () => {
      mockOrderProductRepository.getUserOrderDetailsInProgress.mockReturnValue([
        {
          quantity: 3,
          productID: {
            name: 'product 1',
            size: 'M',
            description: 'description 1',
            price: 37.41,
            type: {
              name: 'type 1',
            },
          },
        },
        {
          quantity: 5,
          productID: {
            name: 'product 2',
            size: 'PP',
            description: 'description 2',
            price: 13.78,
            type: {
              name: 'type 2',
            },
          },
        },
      ]);
      const response = await service.getUserOrderDetailsInProgress('1');
      expect(response).toStrictEqual({
        products: [
          {
            name: 'product 1',
            type: 'type 1',
            size: 'M',
            description: 'description 1',
            price: 37.41,
            quantity: 3,
            subTotal: 112.23,
          },
          {
            name: 'product 2',
            type: 'type 2',
            size: 'PP',
            description: 'description 2',
            price: 13.78,
            quantity: 5,
            subTotal: 68.9,
          },
        ],
        total: 181.13,
      });
      expect(
        mockOrderProductRepository.getUserOrderDetailsInProgress,
      ).toHaveBeenCalledTimes(1);
    });

    it('should return structured order product stamp', async () => {
      mockProductStampRepository.retrieveProductStampsFromOrder.mockReturnValue(
        [
          {
            name: 'product 1',
            type: 'type 1',
            size: 'M',
            description: 'description 1',
            price: 37.41,
            quantity: 3,
            subTotal: 112.23,
          },
          {
            name: 'product 2',
            type: 'type 2',
            size: 'PP',
            description: 'description 2',
            price: 13.78,
            quantity: 5,
            subTotal: 68.9,
          },
        ],
      );
      const response = await service.getOrderProductsStamp('1', '1');
      expect(response).toStrictEqual({
        products: [
          {
            name: 'product 1',
            type: 'type 1',
            size: 'M',
            description: 'description 1',
            price: 37.41,
            quantity: 3,
            subTotal: 112.23,
          },
          {
            name: 'product 2',
            type: 'type 2',
            size: 'PP',
            description: 'description 2',
            price: 13.78,
            quantity: 5,
            subTotal: 68.9,
          },
        ],
        total: '181.13',
      });
      expect(
        mockProductStampRepository.retrieveProductStampsFromOrder,
      ).toHaveBeenCalledTimes(1);
    });
  });
});
