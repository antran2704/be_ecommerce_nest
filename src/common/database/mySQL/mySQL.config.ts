import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const getConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: configService.get<string>('database.mySQL.host'),
    port: configService.get<number>('database.mySQL.port'),
    username: configService.get<string>('database.mySQL.user'),
    password: configService.get<string>('database.mySQL.password'),
    database: configService.get<string>('database.mySQL.dbName'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
  };
};

export { getConfig };
