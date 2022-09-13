import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "src/produto/entities/produto.entity";
import { ProdutoService } from "../service/produto.service";
import { ProdutoController } from "../controller/produto.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    providers: [ProdutoService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
})

export class ProdutoModule {}