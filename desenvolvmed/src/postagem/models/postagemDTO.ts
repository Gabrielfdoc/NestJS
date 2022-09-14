import { IsNotEmpty, MaxLength } from "class-validator";
import { Expose } from "class-transformer";
import { ComentarioDTO } from "../../comentario/models/comentarioDTO";

export class PostagemDTO {

    @Expose({name: "id"})
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Expose({name: "titulo"})
    titulo: string

    @IsNotEmpty()
    @MaxLength(5000)
    @Expose({name: "descricao"})
    descricao: string

    @IsNotEmpty()
    @MaxLength(500)
    @Expose({name: "anexo"})
    anexo: string

    @IsNotEmpty()
    @Expose({name: "data_postagem"})
    dataPostagem: Date

    @Expose({name: "tema_id"})
    tema: number

    @Expose({name: "medico_id"})
    medico: number

    @Expose({name: "comentarios"})
    comentarios: ComentarioDTO[]
}