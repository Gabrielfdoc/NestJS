import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CadastroTemp } from "../entities/cadastroTemp.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CadastroTemp])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule]
}) export class cadastroTempModule { }