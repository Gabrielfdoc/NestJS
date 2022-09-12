import { IsNotEmpty, MaxLength } from "class-validator";
import { Cadastro } from "src/cadastro/entities/cadastro.entity";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('tb_comentarios')
export class Comentario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(300)
    @Column({nullable: true, length: 300})
    conteudo: string

    @ManyToOne(() => Postagem, (postagem) => postagem.comentarios, {
        onDelete: "CASCADE"
    })
    postagem: Postagem

    @ManyToOne(() => Cadastro, (cadastro) => cadastro.comentarios, {
        onDelete: "CASCADE"
    })
    cadastro: Cadastro
}