import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Comentario } from "../entities/comentario.entity";

@Injectable()
export class ComentarioService {

    constructor(
        @InjectRepository(Comentario)
        private comentarioRepository: Repository<Comentario>
    ) { }

    async create(comentario: Comentario): Promise<Comentario> {

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

        let comentarioUpdate = await this.findById(comentario.id)

        if (!comentarioUpdate || !comentario.id) {
            throw new HttpException('Comentário não encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.comentarioRepository.save(comentario)
    }
}