import { Column, Entity } from "typeorm";

@Entity({ name: 'perfil'})
export class Profile {

    @Column({primary: true, generated: true})
    id: number;

    @Column({nullable: false})
    fullname: string;

    @Column()
    address: string;

    @Column()
    phone: number;
}
