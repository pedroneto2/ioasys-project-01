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

### Database

Database diagram can be found in the root directory: fashion-ecommerce.pdf
![database diagram](https://github.com/pedroneto2/ioasys-project-01/blob/master/db-diagram.JPG?raw=true "Database Diagram")

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
