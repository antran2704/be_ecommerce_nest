import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mySQL: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dbName: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
}));
