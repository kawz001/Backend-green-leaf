import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    uuid: string;
    // @Column({ unique: true })
    // cpf: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    @Column()
    profilePicture: string;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    generateUuid() {
        this.uuid = uuidv4();
    }
}
