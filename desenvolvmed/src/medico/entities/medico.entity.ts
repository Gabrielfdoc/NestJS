import { IsNotEmpty, MaxLength } from "class-validator";
import { Cadastro } from "src/cadastro/entities/cadastro.entity";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_medicos')
export class Medico {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(8)
    @Column({ nullable: false, unique: true, length: 8 })
    crm: string

    @OneToMany(() => Postagem, (postagem) => postagem.medico)
    postagens: Postagem[]

    @OneToOne(() => Cadastro, { onDelete: "CASCADE" })
    @JoinColumn()
    cadastro: Cadastro
}