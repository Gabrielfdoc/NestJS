import { IsNotEmpty, Length, MaxLength } from "class-validator";

export class CadastroTemporarioPacienteDTO {

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

    @MaxLength(500)
    convenio: string
}