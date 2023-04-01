import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tsmuser',
  password: 'tsmpassword',
  database: 'tsmdb',
  entities: ['dist/**/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
