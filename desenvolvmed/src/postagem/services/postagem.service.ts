import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";


@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {

        return this.postagemRepository.find({
            relations: {
                tema: true
            }
        })
    }

    async findById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            }, relations: {
                tema: true
            }
        })

        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return postagem
    }

    async findByTitle(titulo: string): Promise<Postagem[]> {

        return this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }, relations: {
                tema: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {

        return this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {

        let postagemUpdate = await this.findById(postagem.id)

        if (!postagemUpdate)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return this.postagemRepository.save(postagem)
    }

    async delete(id: number): Promise<DeleteResult> {

        let postagemDelete = await this.findById(id)

        if (!postagemDelete)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return this.postagemRepository.delete(id)
    }
}