import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Comentario } from "../entities/comentario.entity";
import { Cadastro } from "src/cadastro/entities/cadastro.entity";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { ComentarioDTO } from "../models/comentarioDTO";
import { PostagemDTO } from "src/postagem/models/postagemDTO";
import { serialize } from "class-transformer";

@Injectable()
export class ComentarioService {

    constructor(
        @InjectRepository(Comentario)
        private comentarioRepository: Repository<Comentario>
    ) { }

    async create(comentario: Comentario): Promise<Comentario> {

        if(!comentario.conteudo) {
            throw new HttpException('Comentário Invalido!', HttpStatus.NOT_ACCEPTABLE)
        }

        return this.comentarioRepository.save(comentario)
    }

    async findAll(): Promise<Comentario[]> {

        return this.comentarioRepository.find({
            relations: {
                postagem: true,
                cadastro: true
            }
        })
    }

    async findById(id: number): Promise<Comentario> {

        let comentarioSearch = await this.comentarioRepository.findOne({
            where: {
                id
            }, relations: {
                postagem: true,
                cadastro: true
            }
        })

        if (!comentarioSearch) {
            throw new HttpException('Comentário não encontrado!', HttpStatus.NOT_FOUND)
        }

        return comentarioSearch
    }

    async delete(id: number): Promise<DeleteResult> {

        let comentarioDelete = this.findById(id)

        if (!comentarioDelete) {
            throw new HttpException('Comentário não encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.comentarioRepository.delete(id)
    }

    async update(comentario: Comentario): Promise<Comentario> {

        const comentarioUpdate = await this.findById(comentario.id)

        if (!comentarioUpdate || !comentario.id) {
            throw new HttpException('Comentário não encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.comentarioRepository.save(comentario)
    }

    // private dtoToEntityMapper(comentarioDTO: ComentarioDTO) : Comentario {
    //     const comentario = new Comentario()
    //     const postagem = new Postagem()
    //     const cadastro = new Cadastro()

    //     postagem.id = comentarioDTO.postagem
    //     cadastro.id = comentarioDTO.cadastro

    //     comentario.id = comentarioDTO.id
    //     comentario.cadastro = cadastro
    //     comentario.postagem = postagem
    //     comentario.conteudo = comentarioDTO.conteudo
    //     console.log(comentarioDTO.dataComentario)
    //     comentario.dataComentario = comentarioDTO.dataComentario

    //     console.log(comentario)

    //     return comentario
    // }
}