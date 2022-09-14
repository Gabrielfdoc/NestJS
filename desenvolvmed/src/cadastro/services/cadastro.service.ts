import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CadastroTemp } from "src/cadastrotemp/entities/cadastroTemp.entity";
import { Medico } from "src/medico/entities/medico.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { Cadastro } from "../entities/cadastro.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CadastroService {

    constructor(
        @InjectRepository(Cadastro)
        private cadastroRepository: Repository<Cadastro>,

        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,

        @InjectRepository(Paciente)
        private pacienteRepository: Repository<Paciente>
    ) { }

    async createMedico(cadastroTemporario: CadastroTemp): Promise<Medico> {

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.email = cadastroTemporario.email
        cadastro.nome = cadastroTemporario.nome
        cadastro.cpf = cadastroTemporario.cpf
        cadastro.sobrenome = cadastroTemporario.sobrenome
        cadastro.senha = cadastroTemporario.senha

        medico.crm = cadastroTemporario.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)
    }

    async createPaciente(cadastroTemporario: CadastroTemp): Promise<Paciente> {

        let cadastro: Cadastro = new Cadastro()
        let paciente: Paciente = new Paciente()

        cadastro.email = cadastroTemporario.email
        cadastro.nome = cadastroTemporario.nome
        cadastro.cpf = cadastroTemporario.cpf
        cadastro.sobrenome = cadastroTemporario.sobrenome
        cadastro.senha = cadastroTemporario.senha

        paciente.convenio = cadastroTemporario.convenio

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        paciente.cadastro = novoCadastro

        return this.pacienteRepository.save(paciente)
    }

    async findAll(): Promise<Cadastro[]> {

        return this.cadastroRepository.find({
            relations: {
                comentarios: true,
            }
        })
    }

    async findById(id: number): Promise<Cadastro> {

        let cadastroProcurado = this.cadastroRepository.findOne({
            where: {
                id
            }, relations: {
                comentarios: true
            }
        })

        if (!cadastroProcurado) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return cadastroProcurado
    }

    async delete(id: number): Promise<DeleteResult> {

        let cadastroDeletar = this.findById(id)

        if (!cadastroDeletar) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.cadastroRepository.delete(id)
    }

    async updateMedico(cadastroTemporario: CadastroTemp): Promise<Medico> {

        let cadastroMedicoUpdate = await this.findById(cadastroTemporario.id)

        if (!cadastroMedicoUpdate || !cadastroTemporario.id) {
            throw new HttpException('Médico não encontrado!', HttpStatus.NOT_FOUND)
        }

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.id = cadastroTemporario.id
        cadastro.email = cadastroTemporario.email
        cadastro.nome = cadastroTemporario.nome
        cadastro.cpf = cadastroTemporario.cpf
        cadastro.sobrenome = cadastroTemporario.sobrenome
        cadastro.senha = cadastroTemporario.senha

        let medicoUpdate = await this.medicoRepository.findOne({
            where: {
                crm: ILike(`${cadastroTemporario.crm}`)
            }
        })

        medico.id = medicoUpdate.id
        medico.crm = cadastroTemporario.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)

    }

    async updatePaciente(cadastroTemporario: CadastroTemp): Promise<Paciente> {

        let cadastroPacienteUpdate = await this.findById(cadastroTemporario.id)

        if (!cadastroPacienteUpdate || !cadastroTemporario.id) {
            throw new HttpException('Paciente não encontrado!', HttpStatus.NOT_FOUND)
        }

        let cadastro: Cadastro = new Cadastro()
        let paciente: Paciente = new Paciente()

        cadastro.id = cadastroTemporario.id
        cadastro.email = cadastroTemporario.email
        cadastro.nome = cadastroTemporario.nome
        cadastro.cpf = cadastroTemporario.cpf
        cadastro.sobrenome = cadastroTemporario.sobrenome
        cadastro.senha = cadastroTemporario.senha

        let pacienteUpdate = await this.pacienteRepository.findOne({
            where: {
                id: cadastro.id = cadastroTemporario.id
            }
        })

        paciente.id = pacienteUpdate.id
        paciente.convenio = cadastroTemporario.convenio

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        paciente.cadastro = novoCadastro

        return this.pacienteRepository.save(paciente)
    }

    async findByName(nome: string): Promise<Cadastro[]> {

        return this.cadastroRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }, relations: {
                comentarios: true
            }
        })
    }
}