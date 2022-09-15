import { MaxLength } from "class-validator";
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";


@Entity('tb_pacientes')
export class Paciente {

    @PrimaryGeneratedColumn()
    id: number

    @MaxLength(50)
    @Column({ nullable: true, length: 50 })
    convenio: string

    @OneToOne(() => Cadastro, { onDelete: "CASCADE" })
    @JoinColumn()
    cadastro: Cadastro
}