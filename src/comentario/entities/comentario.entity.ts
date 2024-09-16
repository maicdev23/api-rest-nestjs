import { Publicacion } from "src/publicacion/entities/publicacion.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comment' })
export class Comentario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comentario: string;

    // ----------------------------------------------------------------
    // Relaciones
    // ----------------------------------------------------------------

    @ManyToOne(() => Publicacion, (publicacion) => publicacion.id)
    post: Publicacion;
}