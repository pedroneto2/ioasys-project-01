import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductStampRepository } from '@modules/orders/repositories/productStamp.repository';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { UserRepository } from '@modules/users/repository/user.repository';

import { CheckOutOrderUseCase } from './checkOutOrder.useCase';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

describe('HandleProductToOrderUseCase', () => {
  let service: CheckOutOrderUseCase;

  const mockOrderRepository = {
    checkOutOrder: jest.fn(),
  };

  const mockOrderProductRepository = {
    getUserOrderDetailsInProgress: jest.fn(),
  };

  const mockProductStampRepository = {
    create: jest.fn(),
    saveProductStamp: jest.fn(),
  };

  const mockAddressRepository = {
    getAddress: jest.fn(),
  };

  const mockUserRepository = {
    getCheckOutData: jest.fn(),
  };

  const crypto = new CryptoProvider();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckOutOrderUseCase,
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
        {
          provide: getRepositoryToken(AddressRepository),
          useValue: mockAddressRepository,
        },
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<CheckOutOrderUseCase>(CheckOutOrderUseCase);
  });

  beforeEach(() => {
    mockOrderRepository.checkOutOrder.mockReset();
    mockOrderProductRepository.getUserOrderDetailsInProgress.mockReset();
    mockProductStampRepository.create.mockReset();
    mockProductStampRepository.saveProductStamp.mockReset();
    mockAddressRepository.getAddress.mockReset();
    mockUserRepository.getCheckOutData.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When checking out order', () => {
    it('should return structured order products', async () => {
      mockUserRepository.getCheckOutData.mockReturnValue({
        fullName: 'Full Name 1',
        cpf: '12312312312',
        defaultAddressID: '1234',
      });
      mockAddressRepository.getAddress.mockReturnValue({
        address: 'address 1',
        state: 'SP',
        zipCode: '12123000',
      });
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
      mockOrderRepository.checkOutOrder.mockReturnValue({
        id: '1',
        user_id: '123',
        status: 'request_in_progress',
        client_name: crypto.encrypt('address 1'),
        client_cpf: crypto.encrypt('12312312312'),
        price: crypto.encrypt('999'),
        address: crypto.encrypt('address 1'),
        state: crypto.encrypt('SP'),
        zip_code: crypto.encrypt('12123000'),
      });
      mockProductStampRepository.saveProductStamp.mockReturnValue([
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
      ]);
      const response = await service.checkOutOrder('1', '123');
      expect(response).toStrictEqual({
        orderInfo: {
          id: '1',
          user_id: '123',
          status: 'request_in_progress',
          clientName: 'address 1',
          clientCPF: '12312312312',
          price: '999',
          address: 'address 1',
          state: 'SP',
          zipCode: '12123000',
        },
        productsStamp: [
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
      });
      expect(mockUserRepository.getCheckOutData).toHaveBeenCalledTimes(1);
      expect(mockAddressRepository.getAddress).toHaveBeenCalledTimes(1);
      expect(
        mockOrderProductRepository.getUserOrderDetailsInProgress,
      ).toHaveBeenCalledTimes(1);
      expect(mockOrderRepository.checkOutOrder).toHaveBeenCalledTimes(1);
      expect(mockProductStampRepository.saveProductStamp).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
