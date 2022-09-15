import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity('tb_medicos')
export class Medico {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Length(13)
    @Column({ nullable: false, unique: true, length: 13 })
    crm: string

    @OneToMany(() => Postagem, (postagem) => postagem.medico)
    postagens: Postagem[]

    @OneToOne(() => Cadastro, { onDelete: "CASCADE" })
    @JoinColumn()
    cadastro: Cadastro
}