const { expect } = require('chai');

/*
|_Encontra um usuário já cadastrado
  |__quando o payload informado para encontrar o usuário
    |__retorna um boolean
    |__o boolean deve ser false
  |__quando encontrado com sucesso
    |__retorna um objeto
    |__o objeto deve conter um id do usuário encontrado
*/

// Importar o banco que vai fazer a conexão para poder fazer o 'double' com o sinon
const connectMongo = require('../../models/connection');

const collaboratorService = require('../../services/collaboratorService');
const { mockMongo } = require('../../helper/helperMockMongo');

// eslint-disable-next-line max-lines-per-function
describe('SERVICE: Encontra um usuário já cadastrado', function () {
  let connectionMock;
  let collaboratorMock;

  before(async function () {
    /* Usa-se o banco montado pela lib `mongo-memory-server` - plataforma trybe */
    connectionMock = await mockMongo(connectMongo); 

    const newCollaborator = {
      collaboratorEmail: 'nome@nome.com',
      collaboratorPassword: 'secreta',
      collaboratorName: 'Nome completo do colaborador',
      createdDate: '21/9/2021',
    };

    collaboratorMock = await connectionMock
                                    .collection('collaborators')
                                    .insertOne(newCollaborator);
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(function () {
    connectMongo.connect.restore();
  });

  describe('quando o payload informado não for válido', function () {
    const payloadCollaboratorEmailESenha = {};

    it('retorna um boolean', async function () {
      const response = await collaboratorService.getOne(payloadCollaboratorEmailESenha);

      expect(response).to.be.a('boolean');
    });

    it('o boolean deve ser false', async function () {
      const response = await collaboratorService.getOne(payloadCollaboratorEmailESenha);

      expect(response).to.be.equal(false);
    });
  });

  describe('quando encontrado com sucesso a partir do EMAIL e SENHA', function () {
    const payloadCollaboratorEmailESenha = { 
      collaboratorEmail: 'nome@nome.com',
      collaboratorPassword: 'secreta',
    };

    it('retorna um objeto', async function () {
      const response = await collaboratorService.getOne(payloadCollaboratorEmailESenha);
      
      expect(response).to.be.a('object');
    });

    it('este objeto deve conter o email do usuário encontrado', async function () {
      const response = await collaboratorService.getOne(payloadCollaboratorEmailESenha);

      expect(response.collaboratorEmail)
        .to.be.equal(payloadCollaboratorEmailESenha.collaboratorEmail);
    });
  });

  describe('quando o id informado não for válido', function () {
    const payloadCollaboratorId = {};

    it('retorna um boolean', async function () {
      const response = await collaboratorService.findId(payloadCollaboratorId);

      expect(response).to.be.a('boolean');
    });

    it('o boolean deve ser false', async function () {
      const response = await collaboratorService.findId(payloadCollaboratorId);

      expect(response).to.be.equal(false);
    });
  });

  describe('quando encontrado com sucesso pelo ID', function () {
    it('retorna um objeto', async function () {
      const payloadCollaboratorId = { 
        id: collaboratorMock.insertedId.toString(),
      };
      const response = await collaboratorService.findId(payloadCollaboratorId);

      expect(response).to.be.a('object');
    });

    it('este objeto deve conter o id do usuário encontrado', async function () {
      const payloadCollaboratorId = { 
        id: collaboratorMock.insertedId.toString(),
      };

      const response = await collaboratorService.findId(payloadCollaboratorId);

      // eslint-disable-next-line dot-notation
      expect(response['_id'].toString()).equals(payloadCollaboratorId.id);
    });
  });
});