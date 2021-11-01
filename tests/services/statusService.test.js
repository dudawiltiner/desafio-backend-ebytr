const { expect } = require('chai');

/*
|_Econtra o status de uma tarefa 
  |__quando o ID informado for inválido
     |__retorna um boolean
     |__o bollean deve ser false
  |__quando encontrado pelo ID com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id do status
  
*/

// Importar o banco que vai fazer a conexão para poder fazer o 'double' com o sinon
const connectMongo = require('../../models/connection');

const statusService = require('../../services/statusService');
const { mockMongo } = require('../../helper/helperMockMongo');

describe('SERVICE: Encontra um status já cadastrado', function () {
  let connectionMock;
  let statusMock;
  
  const payloadStatus = [
    { statusName: 'Pronto' },
    { statusName: 'Pendente' },
    { statusName: 'Andamento' },
  ];

  /* Usa-se o banco montado pela lib `mongo-memory-server` - plataforma trybe */
  before(async function () {
    connectionMock = await mockMongo(connectMongo);  

    statusMock = await connectionMock
                                     .collection('status')
                                     .insertMany(payloadStatus);
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(function () {
    connectMongo.connect.restore();
  });    

  describe('quando o id informado não for válido', function () {
    const payloadStatusId = {};

    it('retorna um boolean', async function () {
      const response = await statusService.getOne(payloadStatusId);

      expect(response).to.be.a('boolean');
    });

    it('o boolean deve ser false', async function () {
      const response = await statusService.getOne(payloadStatusId);

      expect(response).to.be.equal(false);
    });
  });

  describe('quando encontrado pelo ID com sucesso', function () {
    it('retorna um objeto', async function () {
      const payloadStatusId = { 
        id: statusMock.insertedIds[0].toString(),
      };

      const response = await statusService.getOne(payloadStatusId);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter o id do status encontrado', async function () {
      const payloadStatusId = { 
        id: statusMock.insertedIds[0].toString(),
      };

      const response = await statusService.getOne(payloadStatusId);

      // eslint-disable-next-line dot-notation
      expect(response['_id'].toString()).equals(payloadStatusId.id);
    });
  });
});