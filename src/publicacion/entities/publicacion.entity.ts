import { Comentario } from "src/comentario/entities/comentario.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'post' })
export class Publicacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    context: string;

    // ----------------------------------------------------------------
    // Relaciones
    // ----------------------------------------------------------------
    
    @OneToMany(() => Comentario, (comentario) => comentario.post)
    comments: Comentario[];


    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

    @Column() userId: number

}
