import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

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
}

export type TeamRepository = Repository<Team>;
