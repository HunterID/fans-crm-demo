export type JWTConfiguration = {
  accessTokenSecret: string;
  accessTokenExpirationTime: number;
  refreshTokenSecret: string;
  refreshTokenExpirationTime: number;
};

export type Configuration = {
  port: number;
  methods: string;
  origins: string;
  jwt: JWTConfiguration;
  mysql: MySqlConfiguration;
};

export type MySqlConfiguration = {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
