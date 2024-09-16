import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'perfil'})
export class Profile {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: false})
    fullname: string;

    @Column()
    address: string;

    @Column()
    phone: number;
}
