import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comentario } from "../../comentario/entities/comentario.entity";
import { Medico } from "../../medico/entities/medico.entity";
import { Tema } from "../../tema/entities/tema.entity";

@Entity('tb_postagens')
export class Postagem {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(20)
    @Column({ nullable: false, length: 255 })
    titulo: string

    @IsNotEmpty()
    @MaxLength(5000)
    @MinLength(20)
    @Column({ nullable: false, length: 5000 })
    descricao: string

    @IsNotEmpty()
    @MaxLength(500)
    @MinLength(10)
    @Column({ nullable: false, length: 500 })
    anexo: string

    @IsNotEmpty()
    @Column({ nullable: false })
    dataPostagem: Date

    @ManyToOne(() => Tema, (tema) => tema.postagens, {
        onDelete: "CASCADE"
    })
    tema: Tema

    @ManyToOne(() => Medico, (medico) => medico.postagens, {
        onDelete: "CASCADE"
    })
    medico: Medico

    @OneToMany(() => Comentario, (comentarioReferencia) => comentarioReferencia.postagem)
    comentarios: Comentario[]
}