import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity({ name: 'usuario' })
export class User {

    @Column({primary: true, generated: true})
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToOne(() => Profile, { eager: true })
    @JoinColumn()
    profile: Profile;
}
