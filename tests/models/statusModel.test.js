const { expect } = require('chai');

/*
|_Econtra o status de uma tarefa 
  |__quando todos encontrados com sucesso
     |__retorna um array
     |__o tamanho do array não deve ser igual a zero
  |__quando encontrado pelo ID com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id do status
  
*/

// Importar o banco que vai fazer a conexão para poder fazer o 'double' com o sinon
const connectMongo = require('../../models/connection');

const statusModel = require('../../models/statusModel');
const { mockMongo } = require('../../helper/helperMockMongo');

describe('MODEL: Encontra um status já cadastrado', function () {
  let connectionMock;
  let payloadStatusId;
  
  const payloadStatus = [
    { statusName: 'Pronto' },
    { statusName: 'Pendente' },
    { statusName: 'Andamento' },
  ];

  /* Usa-se o banco montado pela lib `mongo-memory-server` - plataforma trybe */
  before(async function () {
    connectionMock = await mockMongo(connectMongo);  

    const statusMock = await connectionMock.collection('status')
    .insertMany(payloadStatus);
  
    payloadStatusId = { 
      id: statusMock.insertedIds[0].toString(),
    };
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(function () {
    connectMongo.connect.restore();
  });    

  describe('quando todos encontrados com sucesso', function () {
    it('retorna um array', async function () {
      const response = await statusModel.getAll();

      expect(response).to.be.a('array');
    });

    it('o tamanho do array não deve ser igual a zero', async function () {
      const response = await statusModel.getAll();

      // eslint-disable-next-line dot-notation
      expect(response.length).not.be.equals(0);
    });
  });

  describe('quando encontrado pelo ID com sucesso', function () {
    it('retorna um objeto', async function () {
      const response = await statusModel.getOne(payloadStatusId);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter o id do status encontrado', async function () {
      const response = await statusModel.getOne(payloadStatusId);

      // eslint-disable-next-line dot-notation
      expect(response['_id'].toString()).equals(payloadStatusId.id);
    });
  });
});