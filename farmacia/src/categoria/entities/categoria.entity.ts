import { IsNotEmpty, MaxLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "src/produto/entities/produto.entity";


@Entity('tb_categorias')
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    nome: string

    @IsNotEmpty()
    @MaxLength(200)
    @Column({nullable: false, length: 255})
    descricao: string

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[]
}