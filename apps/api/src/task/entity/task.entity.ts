import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Team } from '../../team/entity/team.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskTitle: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deadline: Date;

  @Column()
  completed: boolean;

  @ManyToOne(() => Team, (team) => team.tasks)
  team: Team;
}

export type TaskRepository = Repository<Task>;
