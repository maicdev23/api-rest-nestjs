import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'person' })
export class Person {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column()
    age: number;

    @Column()
    address: string;

}
