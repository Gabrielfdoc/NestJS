import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CadastroTemporarioDTO } from "src/cadastro/model/cadastrotemporariodto";
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

    async createMedico(cadastroTemporarioDTODTO: CadastroTemporarioDTO): Promise<Medico> {

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.email = cadastroTemporarioDTODTO.email
        cadastro.nome = cadastroTemporarioDTODTO.nome
        cadastro.cpf = cadastroTemporarioDTODTO.cpf
        cadastro.sobrenome = cadastroTemporarioDTODTO.sobrenome
        cadastro.senha = cadastroTemporarioDTODTO.senha

        medico.crm = cadastroTemporarioDTODTO.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)
    }

    async createPaciente(cadastroTemporarioDTO: CadastroTemporarioDTO): Promise<Paciente> {

        let cadastro: Cadastro = new Cadastro()
        let paciente: Paciente = new Paciente()

        cadastro.email = cadastroTemporarioDTO.email
        cadastro.nome = cadastroTemporarioDTO.nome
        cadastro.cpf = cadastroTemporarioDTO.cpf
        cadastro.sobrenome = cadastroTemporarioDTO.sobrenome
        cadastro.senha = cadastroTemporarioDTO.senha

        paciente.convenio = cadastroTemporarioDTO.convenio

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

    async findPacienteById(id: number): Promise<Paciente> {

        const cadastroProcurado = this.pacienteRepository.findOne({
            where: {
                id
            }, relations: {
                cadastro: true
            }
        })

        if (!cadastroProcurado) {
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NOT_FOUND)
        }

        return cadastroProcurado
    }

    async findMedicoByCrm(crm: string): Promise<Medico> {

        const cadastroProcurado = this.medicoRepository.findOne({
            where: {
                crm
            }, relations: {
                cadastro: true
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

    async updateMedico(cadastroTemporarioDTO: CadastroTemporarioDTO): Promise<Medico> {

        let medicoUpdate = await this.findMedicoByCrm(cadastroTemporarioDTO.crm)

        if (!medicoUpdate || !cadastroTemporarioDTO.id) {
            throw new HttpException('Médico não encontrado!', HttpStatus.NOT_FOUND)
        }

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.id = medicoUpdate.cadastro.id
        cadastro.email = cadastroTemporarioDTO.email
        cadastro.nome = cadastroTemporarioDTO.nome
        cadastro.cpf = cadastroTemporarioDTO.cpf
        cadastro.sobrenome = cadastroTemporarioDTO.sobrenome
        cadastro.senha = cadastroTemporarioDTO.senha

        medico.id = medicoUpdate.id
        medico.crm = cadastroTemporarioDTO.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)

    }

    async updatePaciente(cadastroTemporarioDTO: CadastroTemporarioDTO): Promise<Paciente> {

        const pacienteUpdate = await this.findPacienteById(cadastroTemporarioDTO.id)

        if (!pacienteUpdate || !cadastroTemporarioDTO.id) {
            throw new HttpException('Paciente não encontrado!', HttpStatus.NOT_FOUND)
        }

        let cadastro: Cadastro = new Cadastro()
        let paciente: Paciente = new Paciente()

        cadastro.id = pacienteUpdate.cadastro.id
        cadastro.email = cadastroTemporarioDTO.email
        cadastro.nome = cadastroTemporarioDTO.nome
        cadastro.cpf = cadastroTemporarioDTO.cpf
        cadastro.sobrenome = cadastroTemporarioDTO.sobrenome
        cadastro.senha = cadastroTemporarioDTO.senha

        paciente.id = cadastroTemporarioDTO.id
        paciente.convenio = cadastroTemporarioDTO.convenio

        const novoCadastro = await this.cadastroRepository.save(cadastro)

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