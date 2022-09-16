
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { Comentario } from "../entities/comentario.entity";
import { ComentarioDTO } from "../models/comentarioDTO";
import { ComentarioService } from "../services/comentario.service";

@Controller('/comentario')
export class ComentarioController {

    constructor(
        private readonly service: ComentarioService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Comentario[]> {
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
        return this.service.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() comentario: Comentario): Promise<Comentario> {
        return this.service.create(comentario)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() comentario: Comentario): Promise<Comentario> {
        return this.service.update(comentario)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }
}