import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipo' })
export class Tipo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Post, (post) => post.tipo)
    posts: Post[];
}
