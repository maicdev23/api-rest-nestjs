import { Post } from "src/posts/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity({ name: 'usuario' })
export class User {

    @Column({primary: true, generated: true})
    id: number;

    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    password: string;

    @OneToOne(() => Profile, { eager: true })
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
}
