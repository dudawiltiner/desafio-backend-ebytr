const { expect } = require('chai');

/*
|_Faz o CRUD (Criação, Leitura, Atualização, Exclusão) de uma tarefa 
  |__quando o payload ou id informado para encontrar o usuário
     |__retorna um boolean
     |__o boolean deve ser false
  |__quando criada com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa encontrado
  |__quando atualizada com sucesso
     |__retorna um objeto
     |__o objeto deve um indicativo de atualização
  |__quando deletada com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa deletada
*/

// Importar o banco que vai fazer a conexão para poder fazer o 'double' com o sinon
const connectMongo = require('../../models/connection');
const taskService = require('../../services/taskService');
const { mockMongo } = require('../../helper/helperMockMongo');

describe('SERVICE: Faz o CRUD de uma tarefa', function () {
  let connectionMock;
  let collaboratorMock;
  let statusMock;
  let payloadTask;

  before(async function () {
    /* Usa-se o banco montado pela lib `mongo-memory-server` - plataforma trybe */
    connectionMock = await mockMongo(connectMongo);  

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
    
    collaboratorMock = await connectionMock
                              .collection('collaborators')
                              .insertOne(newCollaborator);

    statusMock = await connectionMock
                        .collection('status')
                        .insertMany(newStatus);
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(function () {
    connectMongo.connect.restore();
  });    

  describe('para criar, quando o payload informado não for válido', function () {
    payloadTask = {};

    it('deve retornar um boolean', async function () {
      const response = await taskService.create(payloadTask);

      expect(response).to.be.a('boolean');
    });

    it('este o boolean deve ser false', async function () {
      const response = await taskService.create(payloadTask);

      expect(response).to.be.equal(false);
    });
  });
  
  describe('quando criada com sucesso', function () {
    it('retorna um objeto', async function () {
     payloadTask = { 
        collaboratorId: collaboratorMock.insertedId,
        statusId: statusMock.insertedIds[0],
        title: 'Título da Tarefa',
        description: 'Uma breve descrição do que se trata a tarefa',
        deadlineDate: '11/06/2011',
      };
      await taskService.create(payloadTask); // criar duas tarefas para o teste de delete funcionar
      const response = await taskService.create(payloadTask);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter o id da tarefa criada', async function () {
      const response = await taskService.create(payloadTask);

      payloadTask = {
        // eslint-disable-next-line no-underscore-dangle
        id: response.insertedId.toString(),
        collaboratorId: collaboratorMock.insertedId,
        statusId: statusMock.insertedIds[1],
        title: 'Título da Tarefa 2',
        description: 'Uma breve descrição do que se trata a tarefa com mais detalhes',
        deadlineDate: '22/06/2011',
      };

      expect(response).to.have.a.property('insertedId');
    });
  });

  describe('para atualizar, quando o id informado não for válido', function () {
    const payloadTaskId = {};

    it('retorna um boolean', async function () {
      const response = await taskService.update(payloadTaskId);

      expect(response).to.be.a('boolean');
    });

    it('o boolean deve ser false', async function () {
      const response = await taskService.update(payloadTaskId);

      expect(response).to.be.equal(false);
    });
  });

  describe('quando atualizada com sucesso', function () {
    it('retorna um objeto', async function () {
      const response = await taskService.update(payloadTask);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter uma atualização feita, ou seja "matchedCount" maior que zero',
     async function () {
      const response = await taskService.update(payloadTask);
     
      expect(response.matchedCount).not.be.equals(0);
    });
  });

  describe('para excluir, quando o id informado não for válido', function () {
    const id = '';

    it('retorna um boolean', async function () {
      const response = await taskService.deleteOne({ id });

      expect(response).to.be.a('boolean');
    });

    it('o boolean deve ser false', async function () {
      const response = await taskService.deleteOne({ id });

      expect(response).to.be.equal(false);
    });
  });

  describe('quando deletada com sucesso', function () {
    it('deve retornar um objeto', async function () {
      const response = await taskService.deleteOne({ id: payloadTask.id });

      expect(response).to.be.a('object');
    });

    it('task não encontrada para deletar no objeto "deletedCount" igual 0', async function () {
      const response = await taskService.deleteOne({ id: payloadTask.id });
     
      expect(response.deletedCount).be.equals(0);
    });
  });
});