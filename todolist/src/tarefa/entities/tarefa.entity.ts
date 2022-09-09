import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_tarefa'})

export class Tarefa {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    nome: String

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length: 500})
    descricao: String

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    responsavel: String

    @Column()
    data: Date

    @Column()
    status: Boolean
}