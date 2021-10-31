const { expect } = require('chai');
require('dotenv').config();
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

/*
|_Faz o CRUD (Criação, Leitura, Atualização, Exclusão) de uma tarefa 
  |__quando criada com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa encontrado
  |__quando todas encontradas com sucesso
     |__retorna um array
     |__se tiver pelo menos uma tarefa o tamanho do array de ser diferente de nulo
  |__quando econtrada pelo ID com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa encontrada
  |__quando atualizada com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa atualizada
  |__quando deletada com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa deletada
     |__a tarefa não pode ser encontrada
*/

// Importar o banco que vai fazer a conexão para poder fazer o 'double' com o sinon
const connectMongo = require('../../models/connection');
const taskModel = require('../../models/taskModel');

const { DB_NAME } = process.env;

describe('Faz o CRUD (Criação, Leitura, Atualização, Exclusão) de uma tarefa', function () {
  let connectionMock;
  
  let payloadTask;

  /* Usa-se o banco montado pela lib `mongo-memory-server` - plataforma trybe */
  before(async function () {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    const newCollaborator = {
      collaboratorEmail: 'nome@nome.com',
      collaboratorPassword: 'secreta',
      collaboratorName: 'Nome completo do colaborador',
      createdDate: '21/9/2021',
    };

    const newStatus = [
      { statusName: 'Pronto' },
      { statusName: 'Pendente' },
      { statusName: 'Andamento' },
    ];

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));

    sinon.stub(connectMongo, 'connect').resolves(connectionMock);
    
    const collaboratorMock = await connectionMock
                                     .collection('collaborators')
                                     .insertOne(newCollaborator);

    const statusMock = await connectionMock
                                     .collection('status')
                                     .insertOne(newStatus);
    
    // payloadCollaboratorId = { 
    //   id: collaboratorMock.insertedId.toString(),
    // };
  });

  /* Restauraremos a função `getConnection` original após os testes. */
  after(function () {
    connectMongo.connect.restore();
  });    

  describe('quando criada com sucesso', function () {
    it('retorna um objeto', async function () {
      const response = await taskModel.getOne(payloadTask);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter o email do usuário encontrado', async function () {
      const response = await taskModel.getOne(payloadTask);

      expect(response).to.have.a.property('insertedId');
    });
  });

  // describe('quando encontrado com sucesso pelo ID', function () {
  //   it('retorna um objeto', async function () {
  //     const response = await collaboratorModel.findId(payloadCollaboratorId);

  //     expect(response).to.be.a('object');
  //   });

  //   it('o objeto deve conter o id do usuário encontrado', async function () {
  //     const response = await collaboratorModel.findId(payloadCollaboratorId);
  //     // eslint-disable-next-line dot-notation
  //     expect(response['_id'].toString()).equals(payloadCollaboratorId.id);
  //   });
  // });
});