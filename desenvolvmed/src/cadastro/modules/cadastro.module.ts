import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cadastro } from "../entities/cadastro.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Cadastro])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule]
}) export class CadastroModule {}