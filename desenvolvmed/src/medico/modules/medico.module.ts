import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Medico } from "../entities/medico.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Medico])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule]
}) 

export class MedicoModule {}