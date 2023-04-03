import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Repository,
  Unique,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Team } from '../../team/entity/team.entity';

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
}
export type UserRepository = Repository<User>;
