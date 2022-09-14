import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComentarioController } from "../controllers/comentario.controller";
import { Comentario } from "../entities/comentario.entity";
import { ComentarioService } from "../services/comentario.service";


@Module({
    imports: [TypeOrmModule.forFeature([Comentario])],
    providers: [ComentarioService],
    controllers: [ComentarioController],
    exports: [TypeOrmModule]
})

export class ComentarioModule { }