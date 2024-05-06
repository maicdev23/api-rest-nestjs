import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'post'})
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    context: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;
    
}
