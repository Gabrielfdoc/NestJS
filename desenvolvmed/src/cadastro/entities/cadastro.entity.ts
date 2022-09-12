import { IsNotEmpty, MaxLength } from "class-validator";
import { Comentario } from "src/comentario/entities/comentario.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('tb_cadastros')
export class Cadastro{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    cpf: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    sobrenome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    senha: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    email: string

    @OneToMany(() => Comentario, (comentarioRealizado) => comentarioRealizado.cadastro)
    comentarios: Comentario[]
}