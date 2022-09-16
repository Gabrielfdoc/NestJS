import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CadastroService } from "../services/cadastro.service";
import { DeleteResult } from "typeorm";
import { Cadastro } from "../entities/cadastro.entity";
import { Paciente } from "../../paciente/entities/paciente.entity";
import { Medico } from "../../medico/entities/medico.entity";
import { CadastroTemporarioMedicoDTO } from "../model/cadastrotemporariomedicodto";
import { CadastroTemporarioPacienteDTO } from "../model/cadastrotemporariopacientedto";


@Controller('/cadastro')
export class CadastroController {

    constructor(
        private readonly service: CadastroService
    ) { }

    @Post('/medico')
    @HttpCode(HttpStatus.CREATED)
    createMedico(@Body() cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {
        return this.service.createMedico(cadastroTemporarioMedicoDTO)
    }

    @Post('/paciente')
    @HttpCode(HttpStatus.CREATED)
    createPaciente(@Body() cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {
        return this.service.createPaciente(cadastroTemporarioPacienteDTO)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cadastro[]> {
        return this.service.findAll()
    }

    @Put('/medico')
    @HttpCode(HttpStatus.OK)
    updateMedico(@Body() cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {
        return this.service.updateMedico(cadastroTemporarioMedicoDTO)
    }

    @Put('/paciente')
    @HttpCode(HttpStatus.OK)
    updatePaciente(@Body() cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {
        return this.service.updatePaciente(cadastroTemporarioPacienteDTO)
    }
}