import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PacienteController } from "../controllers/paciente.controller";
import { Paciente } from "../entities/paciente.entity";
import { PacienteService } from "../services/paciente.service";


@Module({
    imports: [TypeOrmModule.forFeature([Paciente])],
    providers: [PacienteService],
    controllers: [PacienteController],
    exports: [TypeOrmModule]
})

export class PacienteModule { }