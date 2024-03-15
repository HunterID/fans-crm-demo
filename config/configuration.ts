import { Configuration } from './configuration.types';

// eslint-disable-next-line complexity
export default (): Configuration => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  origins: process.env.ORIGINS,
  methods: process.env.METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
    accessTokenExpirationTime: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret2',
    refreshTokenExpirationTime: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
  },
  mysql: {
    dialect: process.env.MYSQL_DIALECT,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
});
