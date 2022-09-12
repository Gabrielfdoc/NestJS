import { MaxLength } from "class-validator";
import { Cadastro } from "src/cadastro/entities/cadastro.entity";
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('tb_pacientes')
export class Paciente {

    @PrimaryGeneratedColumn()
    id: number

    @MaxLength(50)
    @Column({nullable: true, length: 50})
    convenio: string

    @OneToOne(() => Cadastro)
    @JoinColumn()
    cadastro: Cadastro
}