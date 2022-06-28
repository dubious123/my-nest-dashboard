import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Dubidubi123',
  database: 'test2',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
