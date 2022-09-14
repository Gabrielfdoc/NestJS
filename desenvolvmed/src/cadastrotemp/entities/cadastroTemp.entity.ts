import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity('tb_cadastro_temp')
export class CadastroTemp {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    cpf: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    sobrenome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    senha: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    email: string

    @MaxLength(8)
    @Column({ nullable: true, length: 8 })
    crm: string

    @MaxLength(50)
    @Column({ nullable: true, length: 50 })
    convenio: string
}