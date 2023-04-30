import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../src/user/entity/user.entity';
import { Team } from '../src/team/entity/team.entity';
import { Task } from '../src/task/entity/task.entity';
import { Chat } from '../src/chat/entities/chat.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tsmuser',
  password: 'tsmpassword',
  database: 'tsmdb',
  entities: [User, Team, Task, Chat],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
