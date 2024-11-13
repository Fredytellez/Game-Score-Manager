import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  score: number;

  @ManyToOne(() => User, (user) => user.scores)
  user: User;
}
