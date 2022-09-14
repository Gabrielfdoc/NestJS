import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async findAll(): Promise<Tema[]> {
        return this.temaRepository.find({
            relations: {
                postagens: true
            }
        })
    }

    async findById(id: number): Promise<Tema> {
        let tema = await this.temaRepository.findOne({
            where: {
                id
            }, relations: {
                postagens: true
            }
        })

        if (!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

        return tema
    }

    async create(tema: Tema): Promise<Tema> {
        return this.temaRepository.save(tema)
    }

    async update(tema: Tema): Promise<Tema> {
        let temaUpdate = await this.findById(tema.id)

        if (!temaUpdate)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

        return this.temaRepository.save(tema)
    }

    async delete(id: number): Promise<DeleteResult> {
        let temaDelete = await this.findById(id)

        if (!temaDelete)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

        return this.temaRepository.delete(id)
    }
}