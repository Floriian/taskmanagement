import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Repository,
  Unique,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Team } from '../../team/entity/team.entity';
import { Task } from '../../task/entity/task.entity';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Team, (team) => team.users)
  team: Team;

  // @ManyToMany(() => Task, (task) => task.users)
  // tasks: Task[];
}
export type UserRepository = Repository<User>;
