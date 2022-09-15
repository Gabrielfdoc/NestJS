import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CadastroService } from "../services/cadastro.service";
import { DeleteResult } from "typeorm";
import { Cadastro } from "../entities/cadastro.entity";
import { Paciente } from "../../paciente/entities/paciente.entity";
import { Medico } from "../../medico/entities/medico.entity";
import { CadastroTemporarioDTO } from "../model/cadastrotemporariodto";

@Controller('/cadastro')
export class CadastroController {

    constructor(
        private readonly service: CadastroService
    ) { }

    @Post('/medico')
    @HttpCode(HttpStatus.CREATED)
    createMedico(@Body() cadastroTemporarioDTO: CadastroTemporarioDTO): Promise<Medico> {
        return this.service.createMedico(cadastroTemporarioDTO)
    }

    @Post('/paciente')
    @HttpCode(HttpStatus.CREATED)
    createPaciente(@Body() cadastroTemporarioDTO: CadastroTemporarioDTO): Promise<Paciente> {
        return this.service.createPaciente(cadastroTemporarioDTO)
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
    updateMedico(@Body() cadastroTemporarioDTO: CadastroTemporarioDTO): Promise<Medico> {
        return this.service.updateMedico(cadastroTemporarioDTO)
    }

    @Put('/paciente')
    @HttpCode(HttpStatus.OK)
    updatePaciente(@Body() cadastroTemporarioDTO: CadastroTemporarioDTO): Promise<Paciente> {
        return this.service.updatePaciente(cadastroTemporarioDTO)
    }
}