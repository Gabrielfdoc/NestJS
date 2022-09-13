import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Categoria } from "src/categoria/entities/categoria.entity";

@Entity('tb_produtos')
export class Produto {

    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    descricao: string

    @IsNotEmpty()
    @Column({nullable: false})
    quantidade: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    laboratorio: string

    @IsNotEmpty()
    @Column({nullable: false})
    preco: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    foto: string

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}