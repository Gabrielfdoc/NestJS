import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CadastroTemp } from "src/cadastrotemp/entities/cadastroTemp.entity";
import { Medico } from "src/medico/entities/medico.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { CadastroService } from "../services/cadastro.service";
import { DeleteResult } from "typeorm";
import { Cadastro } from "../entities/cadastro.entity";

@Controller('/cadastro')
export class CadastroController {

    constructor(
        private readonly service: CadastroService
    ) { }

    @Post('/medico')
    @HttpCode(HttpStatus.CREATED)
    createMedico(@Body() cadastroTemporario: CadastroTemp): Promise<Medico> {
        return this.service.createMedico(cadastroTemporario)
    }

    @Post('/paciente')
    @HttpCode(HttpStatus.CREATED)
    createPaciente(@Body() cadastroTemporario: CadastroTemp): Promise<Paciente> {
        return this.service.createPaciente(cadastroTemporario)
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
    updateMedico(@Body() cadastroTemporario: CadastroTemp): Promise<Medico> {
        return this.service.updateMedico(cadastroTemporario)
    }

    @Put('/paciente')
    @HttpCode(HttpStatus.OK)
    updatePaciente(@Body() cadastroTemporario: CadastroTemp): Promise<Paciente> {
        return this.service.updatePaciente(cadastroTemporario)
    }
}