import { IsNotEmpty, MaxLength } from "class-validator";
import { Expose } from "class-transformer";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";

@UseInterceptors(ClassSerializerInterceptor)
export class ComentarioDTO {

    @Expose({name: "id"})
    id: number

    @IsNotEmpty()
    @MaxLength(300)
    @Expose({name: "conteudo"})
    conteudo: string

    @IsNotEmpty()
    dataComentario: Date

    @IsNotEmpty()
    @Expose({name: "postagem"})
    postagem: number

    @IsNotEmpty()
    @Expose({name: "cadastro"})
    cadastro: number
}
