import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cadastro } from './cadastro/entities/cadastro.entity';
import { CadastroModule } from './cadastro/modules/cadastro.module';
import { Comentario } from './comentario/entities/comentario.entity';
import { ComentarioModule } from './comentario/modules/comentario.module';
import { Medico } from './medico/entities/medico.entity';
import { MedicoModule } from './medico/modules/medico.module';
import { Paciente } from './Paciente/entities/paciente.entity';
import { PacienteModule } from './Paciente/modules/paciente.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/modules/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/modules/tema.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_desenvolvmed',
      entities: [Postagem, Tema, Cadastro, Medico, Paciente, Comentario],
      synchronize: true
    }),
    PostagemModule, 
    CadastroModule, 
    MedicoModule, 
    TemaModule, 
    PacienteModule, 
    ComentarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
