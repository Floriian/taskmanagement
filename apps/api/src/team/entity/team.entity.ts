import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Task } from '../../task/entity/task.entity';
import { Chat } from '../../chat/entities/chat.entity';

@Entity()
@Unique(['teamName'])
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamName: string;

  @Column()
  teamInviteCode: string;

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @OneToMany(() => Task, (task) => task.team)
  tasks: Task[];

  @OneToMany(() => Chat, (chat) => chat.team)
  messages: Chat[];
}

export type TeamRepository = Repository<Team>;
