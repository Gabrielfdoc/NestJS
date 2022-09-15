import { IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";

export class CadastroTemporarioDTO {

    id: number

    @IsNotEmpty()
    @Length(11)
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

    @Length(13)
    crm: string

    @MaxLength(50)
    convenio: string
}