import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from "src/categoria/entities/categoria.entity";
import { CategoriaModule } from "src/categoria/modules/categoria.module";
import { Produto } from "src/produto/entities/produto.entity";
import { ProdutoModule } from "src/produto/modules/produto.module";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', 
    password: 'root',
    database: 'db_farmacia',
    entities: [Produto, Categoria],
    synchronize: true
  }),
  ProdutoModule, CategoriaModule
],
  controllers: [],
  providers: [],
})

export class AppModule {}
