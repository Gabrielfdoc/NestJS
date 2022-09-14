import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Paciente } from "../entities/paciente.entity";
import { Repository } from "typeorm";

@Injectable()
export class PacienteService {

    constructor(
        @InjectRepository(Paciente)
        private pacienteRepository: Repository<Paciente>
    ) { }

    async findAll(): Promise<Paciente[]> {
        return this.pacienteRepository.find({
            relations: {
                cadastro: true
            }
        })
    }

    async findById(id: number): Promise<Paciente> {

        let pacienteSearch = await this.pacienteRepository.findOne({
            where: {
                id
            }, relations: {
                cadastro: true
            }
        })

        if (!pacienteSearch) {
            throw new HttpException('Paciente não encontrado!', HttpStatus.NOT_FOUND)
        }

        return pacienteSearch
    }
}