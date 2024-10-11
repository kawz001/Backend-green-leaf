import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import Difficulty from "./enum/difficulty";
import { User } from "src/users/entities/user.entity";

@Entity('trails')
export class Trail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    distance: number;

    @Column({
        type: "enum",
        enum: Difficulty
    })
    difficulty: Difficulty;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column()
    photo: string;

    @ManyToOne(() => User)
    createdById: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
