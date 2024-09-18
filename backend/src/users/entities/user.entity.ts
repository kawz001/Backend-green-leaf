import { nanoid } from "nanoid";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    uuid: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    profilePicture: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;

    @BeforeInsert()
    generateUuid() {
        this.uuid = nanoid();
    }
}
