import { Entity, PrimaryGeneratedColumn, Column, Repository } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  sexdrugsalcohol: string;
}
export type UserRepository = Repository<User>;
