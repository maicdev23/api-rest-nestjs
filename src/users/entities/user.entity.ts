import { Role } from "src/common/enums/role.enum";
import { Post } from "src/posts/entities/post.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity({ name: 'usuario' })
export class User {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ enum: Role, default: Role.USER })
    role: Role;

    @OneToOne(() => Profile, { eager: true })
    @JoinColumn()
    profile: Profile;
}
