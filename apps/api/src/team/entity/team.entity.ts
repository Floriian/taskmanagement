import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['teamName'])
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamName: string;

  @Column()
  teamInviteCode: string;
}

export type TeamRepository = Repository<Team>;
