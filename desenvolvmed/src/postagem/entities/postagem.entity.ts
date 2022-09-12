import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Comentario } from "src/comentario/entities/comentario.entity";
import { Medico } from "src/medico/entities/medico.entity";
import { Tema } from "src/tema/entities/tema.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_postagens')
export class Postagem{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    titulo: string

    @IsNotEmpty()
    @MaxLength(5000)
    @Column({nullable: false, length: 5000})
    descricao: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length: 500})
    anexo: string

    @ManyToOne(() => Tema, (tema) => tema.postagens, {
        onDelete: "CASCADE"
    }) tema: Tema

    @ManyToOne(() => Medico, (medico) => medico.postagens, {
        onDelete: "CASCADE"
    }) medico: Medico

    @OneToMany(() => Comentario, (comentarioReferencia) => comentarioReferencia.postagem)
    comentarios : Comentario[]
}