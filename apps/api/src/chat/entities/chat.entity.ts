import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Team } from '../../team/entity/team.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Team, (team) => team.messages)
  team: Team;

  @Column()
  message: string;
}

export type ChatRepository = Repository<Chat>;
