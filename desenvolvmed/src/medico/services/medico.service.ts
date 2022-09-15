import { InjectRepository } from "@nestjs/typeorm";
import { Medico } from "../entities/medico.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class MedicoService {

    constructor(
        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,
    ) { }

    async findAll(): Promise<Medico[]> {
        return this.medicoRepository.find({
            relations: {
                cadastro: true,
                postagens: true,
            }
        })
    }

    async findById(id: number): Promise<Medico> {

        let medicoSearch = await this.medicoRepository.findOne({
            where: {
                id
            }, relations: {
                cadastro: true,
                postagens: true,
            }
        })

        if (!medicoSearch) {
            throw new HttpException('Médico não encontrado no sistema!', HttpStatus.NOT_FOUND)
        }

        return medicoSearch
    }

}