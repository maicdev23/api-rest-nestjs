import { Tipo } from "src/tipo/entities/tipo.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'post' })
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    context: string;

    @ManyToOne(() => Tipo, (tipo) => tipo.id)
    tipo: Tipo; // Relacion con tipo de post


    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User; // Guarda informacion de user

    @Column() userId: number

}
