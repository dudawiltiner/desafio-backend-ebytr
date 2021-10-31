const { expect } = require('chai');
require('dotenv').config();
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
/*
|_Encontra um usuário já cadastrado
  |__quando encontrado com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id do usuário encontrado
*/

// Importar o banco que vai fazer a conexão para poder fazer o 'double' com o sinon
const connectMongo = require('../../models/connection');
const collaboratorModel = require('../../models/collaboratorModel');
const { mockMongo } = require('../../helperMockMongo');

const { DB_NAME } = process.env;

describe('Encontra um usuário já cadastrado', function () {
  let connectionMock;
  const payloadCollaboratorEmailESenha = { 
    collaboratorEmail: 'nome@nome.com',
    collaboratorPassword: 'secreta',
  };
  let payloadCollaboratorId;

  /* Usa-se o banco montado pela lib `mongo-memory-server` - plataforma trybe */
  before(async function () {
    connectionMock = await mockMongo({ 
      sinon, 
      MongoMemoryServer, 
      MongoClient, 
      DB_NAME, 
      connectMongo }); 

    const newCollaborator = {
      collaboratorEmail: 'nome@nome.com',
      collaboratorPassword: 'secreta',
      collaboratorName: 'Nome completo do colaborador',
      createdDate: '21/9/2021',
    };

    sinon.stub(connectMongo, 'connect').resolves(connectionMock);
    
    const collaboratorMock = await connectionMock
                                    .collection('collaborators')
                                    .insertOne(newCollaborator);
    
    payloadCollaboratorId = { 
      id: collaboratorMock.insertedId.toString(),
    };
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(function () {
    connectMongo.connect.restore();
  });    

  describe('quando encontrado com sucesso pelo EMAIL e SENHA', function () {
    it('retorna um objeto', async function () {
      const response = await collaboratorModel.getOne(payloadCollaboratorEmailESenha);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter o email do usuário encontrado', async function () {
      const response = await collaboratorModel.getOne(payloadCollaboratorEmailESenha);

      expect(response.collaboratorEmail)
        .to.be.equal(payloadCollaboratorEmailESenha.collaboratorEmail);
    });
  });

  describe('quando encontrado com sucesso pelo ID', function () {
    it('retorna um objeto', async function () {
      const response = await collaboratorModel.findId(payloadCollaboratorId);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter o id do usuário encontrado', async function () {
      const response = await collaboratorModel.findId(payloadCollaboratorId);
      // eslint-disable-next-line dot-notation
      expect(response['_id'].toString()).equals(payloadCollaboratorId.id);
    });
  });
});