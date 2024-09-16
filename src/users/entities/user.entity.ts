import { Role } from "src/common/enums/role.enum";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuario' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ default: Role.USER })
    role: Role;

    @OneToOne(() => Profile, { eager: true })
    @JoinColumn()
    profile: Profile;
}
