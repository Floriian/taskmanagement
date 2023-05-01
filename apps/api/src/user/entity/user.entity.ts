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
import { Chat } from '../../chat/entities/chat.entity';

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

  @ManyToOne(() => Team, (team) => team.users) //this must be one-to-one
  team: Team;

  @OneToMany(() => Chat, (chat) => chat.user)
  messages: Chat[];

  // @ManyToMany(() => Task, (task) => task.users)
  // tasks: Task[];
}
export type UserRepository = Repository<User>;
