import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes do módulo de tarefa (e2e)', () => {
  let app: INestApplication;

  jest.setTimeout(50000)
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_todolist_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let tarefaId: number

  //Teste para inserir uma tarefa no banco
  it('01 - Deve inserir uma tarefa no banco', async () => {
    let response = await request(app.getHttpServer())
    .post('/tarefa')
    .send({
      nome: 'Tarefa inicial',
      descricao: 'A primeira tarefa do dia',
      responsavel: 'Gabriel',
      data: '2022-09-15',
      status: true
    })
    .expect(201)

    tarefaId = response.body.id
  })

  it('02 - Deve recuperar uma tarefa especifica', async () => {
    return await request(app.getHttpServer())
    .get(`/tarefa/${tarefaId}`)
    .expect(200)
  })

  it('03 - Deve atualizar uma tarefa', async () => {
    return await request(app.getHttpServer())
    .put('/tarefa')
    .send({
      id: 1,
      nome: 'Primeira tarefa - Atualizada',
      descricao: 'A nova primeira tarefa do dia',
      responsavel: 'Gabriel',
      data: '2022-09-15',
      status: true
    })
    .expect(200)
    .then(response => {
      expect('Primeira tarefa - Atualizada').toEqual(response.body.nome)
    })
  })

  it('04 - Não deverá atualizar uma tarefa que não existe', async () => {
    return await request(app.getHttpServer())
    .put('/tarefa')
    .send({
      id: 555,
      nome: 'Primeira tarefa - Atualizada',
      descricao: 'A nova primeira tarefa do dia',
      responsavel: 'Gabriel',
      data: '2022-09-15',
      status: true
    })
    .expect(404)
  })

  it('05 - Deve deletar uma tarefa', async () => {
    return request(app.getHttpServer())
    .delete(`/tarefa/${tarefaId}`)
    .expect(204)
  })

  it('06 - Deverá ')
  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });


  //Para a execução dos testes
  afterAll(async () => {
    await app.close()
  })
});
