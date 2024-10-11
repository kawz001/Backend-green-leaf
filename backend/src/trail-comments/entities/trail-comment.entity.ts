import { Trail } from "src/trails/entities/trail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('trail_comments')
export class TrailComment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Trail)
    trail_id: number;

    @ManyToOne(() => User)
    user_id: number;

    @Column()
    comment: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
