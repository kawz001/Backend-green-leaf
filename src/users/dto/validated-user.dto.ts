import { User } from "../entities/user.entity";

export class ValidatedUser {
    constructor(user: User) {
        this.id = user.id;
        this.name = user.firstName + " " + user.lastName
        this.email = user.email;
    }

    id: number;
    name: string;
    email: string;
}
