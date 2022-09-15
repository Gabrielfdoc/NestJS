import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity('tb_comentarios')
export class Comentario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(300)
    @MinLength(10)
    @Column({ nullable: false, length: 300 })
    conteudo: string

    @IsNotEmpty()
    @Column({ nullable: false })
    dataComentario: Date

    @ManyToOne(() => Postagem, (postagem) => postagem.comentarios, {
        onDelete: "CASCADE"
    })
    postagem: Postagem

    @ManyToOne(() => Cadastro, (cadastro) => cadastro.comentarios, {
        onDelete: "CASCADE"
    })
    cadastro: Cadastro
}