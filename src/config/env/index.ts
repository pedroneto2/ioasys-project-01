export default () => {
  return {
    cryptoKey: process.env.CRYPTO_KEY,
    ivHexKey: process.env.IV_HEX_KEY,

    port: parseInt(process.env.PORT, 10),
    expiresIn: process.env.EXPIRES_IN,
    jwtSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.REFRESH_JWT_SECRET,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,

    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT, 5432),
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    adminID: process.env.ADMIN_ID,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    adminFullName: process.env.ADMIN_FULL_NAME,
    adminCPF: process.env.ADMIN_CPF,
    adminAdress: process.env.ADMIN_ADDRESS,
    adminState: process.env.ADMIN_STATE,
    adminZipCode: process.env.ADMIN_ZIP_CODE,
  };
};
