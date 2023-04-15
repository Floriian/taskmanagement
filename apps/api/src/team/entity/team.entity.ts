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
}

export type TeamRepository = Repository<Team>;
