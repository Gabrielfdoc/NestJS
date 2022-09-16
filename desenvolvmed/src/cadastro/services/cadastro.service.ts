import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CadastroTemporarioMedicoDTO } from "../model/cadastrotemporariomedicodto";
import { CadastroTemporarioPacienteDTO } from "../model/cadastrotemporariopacientedto";
import { Medico } from "../../medico/entities/medico.entity";
import { Paciente } from "../../paciente/entities/paciente.entity";
import { Cadastro } from "../entities/cadastro.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { matches } from "class-validator";

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


    async createMedico(cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {

        if (!cadastroTemporarioMedicoDTO.crm || !matches(cadastroTemporarioMedicoDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('Dados inválidos!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioMedicoDTO.email || !cadastroTemporarioMedicoDTO.email.includes("@")) {
            throw new HttpException('E-mail já cadastrado ou inválido!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.email = cadastroTemporarioMedicoDTO.email
        cadastro.nome = cadastroTemporarioMedicoDTO.nome
        cadastro.cpf = cadastroTemporarioMedicoDTO.cpf
        cadastro.sobrenome = cadastroTemporarioMedicoDTO.sobrenome
        cadastro.senha = cadastroTemporarioMedicoDTO.senha

        medico.crm = cadastroTemporarioMedicoDTO.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)
    }

    async createPaciente(cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {

        if (!matches(cadastroTemporarioPacienteDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('CPF inválido!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioPacienteDTO.email || !cadastroTemporarioPacienteDTO.email.includes("@")) {
            throw new HttpException('E-mail já cadastrado!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let cadastro: Cadastro = new Cadastro()
        let paciente: Paciente = new Paciente()

        cadastro.email = cadastroTemporarioPacienteDTO.email
        cadastro.nome = cadastroTemporarioPacienteDTO.nome
        cadastro.cpf = cadastroTemporarioPacienteDTO.cpf
        cadastro.sobrenome = cadastroTemporarioPacienteDTO.sobrenome
        cadastro.senha = cadastroTemporarioPacienteDTO.senha

        paciente.convenio = cadastroTemporarioPacienteDTO.convenio

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
            throw new HttpException('Cadastro não encontrado!', HttpStatus.NO_CONTENT)
        }

        return this.cadastroRepository.delete(id)
    }

    async updateMedico(cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {

        let medicoUpdate = await this.findMedicoByCrm(cadastroTemporarioMedicoDTO.crm)

        if (!medicoUpdate || !cadastroTemporarioMedicoDTO.id) {
            throw new HttpException('Médico não encontrado!', HttpStatus.NOT_FOUND)
        } else if (!matches(cadastroTemporarioMedicoDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('CPF inválido!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioMedicoDTO.email || !cadastroTemporarioMedicoDTO.email.includes("@")) {
            throw new HttpException('E-mail já cadastrado!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let cadastro: Cadastro = new Cadastro()
        let medico: Medico = new Medico()

        cadastro.id = medicoUpdate.cadastro.id
        cadastro.email = cadastroTemporarioMedicoDTO.email
        cadastro.nome = cadastroTemporarioMedicoDTO.nome
        cadastro.cpf = cadastroTemporarioMedicoDTO.cpf
        cadastro.sobrenome = cadastroTemporarioMedicoDTO.sobrenome
        cadastro.senha = cadastroTemporarioMedicoDTO.senha

        medico.id = medicoUpdate.id
        medico.crm = cadastroTemporarioMedicoDTO.crm

        let novoCadastro = await this.cadastroRepository.save(cadastro)

        medico.cadastro = novoCadastro

        return this.medicoRepository.save(medico)
    }

    async updatePaciente(cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {

        const pacienteUpdate = await this.findPacienteById(cadastroTemporarioPacienteDTO.id)

        if (!pacienteUpdate || !cadastroTemporarioPacienteDTO.id) {
            throw new HttpException('Paciente não encontrado!', HttpStatus.NOT_FOUND)
        } else if (!matches(cadastroTemporarioPacienteDTO.cpf, /^[0-9]+$/)) {
            throw new HttpException('CPF inválido!', HttpStatus.BAD_REQUEST)
        } else if (!cadastroTemporarioPacienteDTO.email || !cadastroTemporarioPacienteDTO.email.includes("@")) {
            throw new HttpException('E-mail já cadastrado!', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let cadastro: Cadastro = new Cadastro()
        let paciente: Paciente = new Paciente()

        cadastro.id = pacienteUpdate.cadastro.id
        cadastro.email = cadastroTemporarioPacienteDTO.email
        cadastro.nome = cadastroTemporarioPacienteDTO.nome
        cadastro.cpf = cadastroTemporarioPacienteDTO.cpf
        cadastro.sobrenome = cadastroTemporarioPacienteDTO.sobrenome
        cadastro.senha = cadastroTemporarioPacienteDTO.senha

        paciente.id = cadastroTemporarioPacienteDTO.id
        paciente.convenio = cadastroTemporarioPacienteDTO.convenio

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