import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Repository,
  Unique,
} from 'typeorm';

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
}
export type UserRepository = Repository<User>;
