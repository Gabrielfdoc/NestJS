import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testando requisições da API utilizada no app DesenvolvMED', () => {
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
          database: 'db_desenvolvmed_testes',
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

  let temaId: number

  //Teste para inserir um tema no banco
  it('01 - Deve criar um tema no banco', async () => {
    let response = await request(app.getHttpServer())
      .post('/tema')
      .send({
        tema: "Epidemias"
      })
      .expect(201)

    temaId = response.body.id
  });

  it('02 - Procurar o tema por id', async () => {
    return request(app.getHttpServer())
      .get('/tema/' + temaId)
      .expect(200)
  })

  it('03 - Atualizar um tema', async () => {
    return request(app.getHttpServer())
      .put('/tema/')
      .send({
        id: temaId,
        tema: "Epidemia"
      })
      .expect(200)
      .then(response => {
        expect("Epidemia").toEqual(response.body.tema)
        expect("Epidemias").not.toBe(response.body.tema)
      });
  })

  it('04 - Deve retornar todos os temas no banco', async () => {
    return request(app.getHttpServer())
      .get('/tema')
      .expect(200)
  })

  let medicoId: number
  let medicoCrm: string
  let medicoCadastroGeralId: number

  it('05 - Deverá criar um médico', async () => {
    let response = await request(app.getHttpServer())
      .post('/cadastro/medico')
      .send({
        cpf: "12345678914",
        nome: "Paulo",
        sobrenome: "Marques",
        senha: "23232",
        email: "paulinho@gmail.com",
        crm: "CRM/SP 123456",
        convenio: ""
      })
      .expect(201)
    medicoId = response.body.id
    medicoCrm = response.body.crm
    medicoCadastroGeralId = response.body.cadastro.id
  })

  it('06 - Procurar o médico por id', async () => {
    return request(app.getHttpServer())
      .get('/medico/' + medicoId)
      .expect(200)
  })

  it('07 - Atualizar um medico', async () => {
    return request(app.getHttpServer())
      .put('/cadastro/medico')
      .send({
        id: medicoId,
        cpf: "12345671981",
        nome: "Paulo",
        sobrenome: "Marquesine",
        senha: "23232",
        email: "paulinho@gmail.com",
        crm: "CRM/SP 123456",
        convenio: ""
      })
      .expect(200)
      .then(response => {
        expect('Marquesine').toEqual(response.body.cadastro.sobrenome)
      })
  })

  it('08 - Deverá procurar todos os médicos', async () => {
    return request(app.getHttpServer())
      .get('/medico')
      .expect(200)
  })

  let postagemId: number
  let postagemTitulo: string

  it('09 - Deverá criar uma nova postagem', async () => {
    let response = await request(app.getHttpServer())
      .post('/postagem')
      .send({
        titulo: "Vacinas!",
        descricao: "Vacinas disponiveis no posto de saude",
        anexo: "foto.jpeg",
        dataPostagem: "2022-09-15",
        tema: 1,
        medico: 1
      })
      .expect(200)

    postagemId = response.body.id
    postagemTitulo = response.body.titulo

  })

  it('10 - Deverá encontrar uma postagem por id', async () => {
    return request(app.getHttpServer())
      .get('/postagem/' + postagemId)
      .expect(200)
  })

  it('11 - Atualiza uma postagem', async () => {
    return request(app.getHttpServer())
      .put('/postagem')
      .send({
        id: postagemId,
        titulo: "Vacinas!",
        descricao: "Vacinas disponiveis no posto de saude 1 de Osasco!",
        anexo: "foto.jpeg",
        dataPostagem: "2022-09-15",
        tema: 1,
        medico: 1
      })
      .expect(200)
      .then(response => {
        expect('Vacinas disponiveis no posto de saude 1 de Osasco!').toEqual(response.body.descricao)
      })
  })

  it('12 - Deverá encontrar uma postagem pelo título', async () => {

    return request(app.getHttpServer())
      .get(`/postagem/busca/${postagemTitulo}`)
      .expect(200)
      .then(response => {
        expect(response.body[0].descricao).toEqual('Vacinas disponiveis no posto de saude 1 de Osasco!')
      })
  })

  it('13 - Deverá retornar todas as postagens', async () => {
    return request(app.getHttpServer())
      .get('/postagem')
      .expect(200)
  })

  let comentarioId: number

  it('14 - Adicionando um comentario a uma postagem', async () => {

    let response = await request(app.getHttpServer())
      .post('/comentario')
      .send({
        conteudo: "Que post maravilhoso!",
        dataComentario: "2022-09-15",
        postagem: postagemId,
        cadastro: medicoId
      })
      .expect(201)

    comentarioId = response.body.id
  })

  it('15 - Deverá buscar todos os comentários', async () => {

    return await request(app.getHttpServer())
      .get('/comentario')
      .expect(200)
  })

  it('16 - Deverá buscar um comentário por id', async () => {
    return request(app.getHttpServer())
      .get(`/comentario/${comentarioId}`)
      .expect(200)
  })

  it('17 - Deverá atualizar um comentário', async () => {
    return request(app.getHttpServer())
      .put('/comentario')
      .send({
        id: comentarioId,
        conteudo: "Que post maravilhoso e sincero!",
        dataComentario: "2022-09-15",
        postagem: postagemId,
        cadastro: medicoId
      })
      .expect(200)
      .then(response => {
        expect("Que post maravilhoso e sincero!").toEqual(response.body.conteudo)
      })
  })

  let idPaciente: number
  let idCadastroGeral: number

  it('18 - Deverá criar um novo paciente', async () => {

    let response = await request(app.getHttpServer())
      .post('/cadastro/paciente')
      .send({
        cpf: "01737333101",
        nome: "Luciano",
        sobrenome: "Marques",
        senha: "1294fs",
        email: "joselito22@gmail.com",
        crm: "",
        convenio: ""
      })
      .expect(201)
    idPaciente = response.body.id
    idCadastroGeral = response.body.cadastro.id
  })

  it('19 - Deverá buscar um paciente por id cadastro', async () => {
    return request(app.getHttpServer())
      .get(`/paciente/${idPaciente}`)
      .expect(200)
  })

  it('20 - Deverá atualizar um paciente', async () => {

    return request(app.getHttpServer())
      .put('/cadastro/paciente')
      .send({
        id: idPaciente,
        cpf: "01737333155",
        nome: "Jose",
        sobrenome: "Marcos",
        senha: "1294fs",
        email: "oziraldo@gmail.com",
        crm: "",
        convenio: "Unimed"
      })
      .expect(200)
      .then(response => {
        expect("Unimed").toEqual(response.body.convenio)
      })
  })

  let idComentarioPaciente: number

  it('21 - Paciente deve postar um comentário: ', async () => {
    let response = await request(app.getHttpServer())
      .post('/comentario')
      .send({
        conteudo: "Adorei o post doutor!",
        dataComentario: "2022-09-15",
        postagem: postagemId,
        cadastro: idCadastroGeral
      })
      .expect(201)

    idComentarioPaciente = response.body.id
  })

  it('22 - Deve atualizar o comentário de um paciente: ', async () => {
    let response = await request(app.getHttpServer())
      .put('/comentario')
      .send({
        id: idComentarioPaciente,
        conteudo: "Adorei o post doutor, muito informativo!",
        dataComentario: "2022-09-15",
        postagem: postagemId,
        cadastro: idCadastroGeral
      })
      .expect(200)
      .then(response => {
        expect("Adorei o post doutor, muito informativo!").toEqual(response.body.conteudo)
      });
  })

  it('23 - Deverá deletar um post', async () => {

    return request(app.getHttpServer())
      .delete(`/postagem/${postagemId}`)
      .expect(200)
  })

  it('24 - Deverá deletar um tema', async () => {
    return request(app.getHttpServer())
      .delete('/tema/' + temaId)
      .expect(204)
  })

  it('25 - Deverá deletar um médico', async () => {
    return request(app.getHttpServer())
      .delete(`/cadastro/${medicoCadastroGeralId}`)
      .expect(204)
  })

  it('26 - Deverá deletar um paciente', async () => {
    return request(app.getHttpServer())
      .delete('/cadastro/' + idCadastroGeral)
      .expect(204)
  })
});