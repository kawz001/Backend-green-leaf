import { Trail } from 'src/trails/entities/trail.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

@Entity('trail_comments')
export class TrailComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trail, { onDelete: 'CASCADE' }) // Relaciona com a trilha
  @JoinColumn({ name: 'trail_id' })
  trail: Trail;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Relaciona com o usuário
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
