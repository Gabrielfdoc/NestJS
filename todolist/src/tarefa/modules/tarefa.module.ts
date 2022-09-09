import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/tarefa.service";
import { TarefaController } from "../controllers/tarefa.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Tarefa])],
    providers: [TarefaService],
    controllers: [TarefaController],
    exports: [TypeOrmModule]
})

export class TarefaModule {}