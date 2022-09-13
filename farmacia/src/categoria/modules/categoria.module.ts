import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { CategoriaController } from "../controllers/categoria.controller";
import { CategoriaService } from "../services/categora.service";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [TypeOrmModule]
})

export class CategoriaModule {}