import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'usuario'})
export class User {

    @Column({primary: true, generated: true})
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;
}
