import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tarefa } from "../entities/tarefa.entity";

@Injectable()
export class TarefaService {

    constructor(
        //Injeta repositório pra dentro da variável tarefaRepository
        @InjectRepository(Tarefa)
        private tarefaRepository: Repository<Tarefa>
    ) {}

    async findAll(): Promise<Tarefa[]> {
        //Retornando todos os dados da tabela tarefa
        return this.tarefaRepository.find({
            relations: {
                categoria: true
            }
        })
    }

    async findById(id: number): Promise<Tarefa> {
        let tarefa = await this.tarefaRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        })

        //Se tarefa estiver vazia, retorna a excpetion
        if (!tarefa)
            throw new HttpException(`Tarefa não foi encontrada!`, HttpStatus.NOT_FOUND)

            return tarefa
    }

    async findByName(nome: String): Promise<Tarefa[]> {
        return this.tarefaRepository.find({
            where: {
                //ILike = encontra todas as ocorrências, sendo case insensitive. Sem o I seria case sensitive
                nome: ILike(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        })
    }

    async create(tarefa: Tarefa): Promise<Tarefa> {
        return this.tarefaRepository.save(tarefa)
    }

    async update(tarefa: Tarefa): Promise<Tarefa> {

        let tarefaUpdate = await this.findById(tarefa.id)

        if (!tarefaUpdate || !tarefa.id)
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND)

        return this.tarefaRepository.save(tarefa)
    }

    async delete(id: number): Promise<DeleteResult> {

        let tarefaDelete = await this.findById(id)

        if (!tarefaDelete)
            throw new HttpException('Tarefa não foi encontrada', HttpStatus.NOT_FOUND)

        return this.tarefaRepository.delete(id)
    }
}