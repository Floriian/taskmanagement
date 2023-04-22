import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Team } from '../../team/entity/team.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskTitle: string;

  @Column()
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  createdBy: string;

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

  // @ManyToMany(() => User, (user) => user.tasks)
  // users: User[];
}

export type TaskRepository = Repository<Task>;
