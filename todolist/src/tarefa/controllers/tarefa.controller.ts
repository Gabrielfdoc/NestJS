import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/tarefa.service";

@Controller('/tarefa')

export class TarefaController {
    constructor(private readonly service: TarefaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tarefa[]> {
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    //precisa de receber um parametro, sendo esse um número que corresponde ao id e retorna uma promise do tipo Tarefa
    //ParseIntPipe para transformar o parametro para um JS Int(Ou joga uma exceção caso a conversão falhe)
    findByID(@Param('id', ParseIntPipe)id: number): Promise<Tarefa> {
        return this.service.findById(id)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome: string): Promise<Tarefa[]> {
        return this.service.findByName(nome)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    //precisa de receber uma tarefa do tipo tarefa, que necessariamente tem um corpo e retorna uma promise do tipo Tarefa
    create(@Body() tarefa: Tarefa): Promise<Tarefa> {
        return this.service.create(tarefa)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() tarefa: Tarefa) : Promise<Tarefa> {
        return this.service.update(tarefa)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id)
    }
}