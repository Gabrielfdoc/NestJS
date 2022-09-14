import { IsNotEmpty, MaxLength } from "class-validator";

export class CadastroTemporarioDTO {

    id: number

    @IsNotEmpty()
    @MaxLength(11)
    cpf: string

    @IsNotEmpty()
    @MaxLength(255)
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    sobrenome: string

    @IsNotEmpty()
    @MaxLength(255)
    senha: string

    @IsNotEmpty()
    @MaxLength(255)
    email: string

    @MaxLength(8)
    crm: string

    @MaxLength(50)
    convenio: string
}