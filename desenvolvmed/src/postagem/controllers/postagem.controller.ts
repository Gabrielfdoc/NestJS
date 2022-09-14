import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";

@Controller('/postagem')
export class PostagemController {

    constructor(
        private readonly service: PostagemService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return this.service.findById(id)
    }

    @Get('/busca/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.service.findByTitle(titulo)
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.service.create(postagem)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.service.update(postagem)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }
}