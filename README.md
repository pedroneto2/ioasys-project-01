## Description

Fashion ecommerce back end API project 01 - **Ioasys BACK-END 2022**

[Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

### Create DATABASE
This app **MUST HAVE** a database created before follow with next installation steps.

It is suggested to use the name 'fashion-ecommerce' once some configurations are setted with this name.

### Setup env variables
```bash
DB_HOST             => HOST DATA BASE                (REQUIRED) EX: 127.0.0.1  
DB_PORT             => HOST DATA BASE PORT           (REQUIRED) EX: 5432
DB_USERNAME         => DATA BASE USERNAME            (REQUIRED) EX: postgres 
DB_PASSWORD         => DATA BASE PASSWORD            (REQUIRED) EX: root
DB_DATABASE_NAME    => DATA BASE NAME                (REQUIRED) EX: fashion-ecommerce 
PORT                => API PORT                      (REQUIRED) EX: 3000 

CRYPTO_KEY          => CRYPTOGRAPHY KEY              (REQUIRED) EX: hISH0ds8adsdh8ud
IV_HEX_KEY          => CRYPTOGRAPHY IV KEY           (REQUIRED) EX: 9Fu890dsy83d3

JWT_SECRET          => JWT TOKEN SECRET              (REQUIRED) EX: 9gS%A$5f$F$EWF4 
EXPIRES_IN=         => JWT TOKEN EXPIRATION TIME     (REQUIRED) EX: 60s
REFRESH_JWT_SECRET  => REFRESH TOKEN SECRET          (REQUIRED) EX: Sd9SDWE%d5w43
REFRESH_EXPIRES_IN  => REFRESH TOKEN EXPIRATION TIME (REQUIRED) EX: 24H

ADMIN_PASSWORD      => ADMIN PASSWORD                (REQUIRED) EX: admin
ADMIN_EMAIL         => ADMIN EMAIL                   (REQUIRED) EX: admin@admin.com
ADMIN_ID            => ADMIN USER ID                 (OPTIONAL) EX: a000-00a0-a000-0aaa000000a0

ADMIN_FULL_NAME     => ADMIN FULL NAME               (OPTIONAL) EX: Joao da Silva
ADMIN_CPF           => ADMIN CPF                     (OPTIONAL) EX: 12312312312
```

### Install dependences
```bash
$ npm install
```
### Run migrations
```bash
$ npm run typeorm migration:run
```
### Run seeds
```bash
$ npm run seed:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Consideration

### API SWAGGER

API documentation can be accessed through SWAGGER at: "/api/docs/"

### API WORK FLOW

- log in with admin account (AUTH SESSION) created with SEED;
- create one or more product type (PRODUCT TYPES SESSION);
- create one or more product (PRODUCTS SESSION);
- create a user account (USERS SESSION) and log in;
- create one or more address (ADDRESSESS SESSION);
- you can set a default address for your user (USER SESSION). It is optional;
- add products to your order in progress at 'handle-product' (ORDERS SESSION). You can set negative ammounts in order to remove products. You can see the list of products and its IDs at 'products-show-case' (PRODUCTS SESSION);
- you can check your order in progress details at 'get-order-details' (ORDERS SESSION);
- once you finished to select your products, you can check out your order at 'check-out-order-in-progress' and then its status will be changed from 'request_in_progress' to 'request_done'. If you did not set a default address, you must provide a address ID you registered. If you have setted a default address, provide an address ID is optional;
- you can see your "NOT in progress" orders at 'get-orders-info' and check its detail through 'get-order-details/checked-out'.

some addition features:
- admins can disconnect a user (ADMIN SESSION);
- admins can convert normal users to admins (ADMIN SESSION);
- admins can see a list with all users (USERS SESSIONS);
- admins can see users details (USERS SESSIONS);
- It is highly recomended to set a small expiration time for JWT_TOKEN (60 seconds for example) and then provide a higher expiration time for REFRESH_TOKEN (24 hours for example). Therefore your JWT_TOKEN can be refreshed at '/auth/refresh' (AUTH SESSION);

### Database

Database diagram can be found in the root directory: fashion-ecommerce.pdf
![database diagram](https://github.com/pedroneto2/ioasys-project-01/blob/master/db-diagram.JPG?raw=true "Database Diagram")

## Revert Seeds and Migrations

In order to revert seeds and migrations, you MUST execute SEED revert before MIGRATION (even if you want to revert MIGRATIONS only, once SEED is a type of MIGRATION).

### Reverting seeds

```bash
$ npm run seed:revert
```

### Reverting migrations

Execute the next command the number of migration tables you have (8x):
```bash
$ npm run typeorm migration:revert
```

## Editing

If you wish to edit something, you must transpile the code before execution:

```bash
$ npm run build
```

The code can be auto-formated:

```bash
$ npm run format
```

and ES Lint erros can be found:

```bash
$ npm run lint
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
