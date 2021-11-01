const { expect } = require('chai');

/*
|_Faz o CRUD (Criação, Leitura, Atualização, Exclusão) de uma tarefa 
  |__quando criada com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa encontrado
  |__quando todas encontradas com sucesso
     |__retorna um array
     |__se tiver pelo menos uma tarefa o tamanho do array de ser diferente de zero
  |__quando atualizada com sucesso
     |__retorna um objeto
     |__o objeto deve um indicativo de atualização
  |__quando deletada com sucesso
     |__retorna um objeto
     |__o objeto deve conter um id da tarefa deletada
*/

// Importar o banco que vai fazer a conexão para poder fazer o 'double' com o sinon
const connectMongo = require('../../models/connection');
const taskModel = require('../../models/taskModel');
const { mockMongo } = require('../../helper/helperMockMongo');

describe('MODEL: Faz o CRUD (Criação, Leitura, Atualização e Exclusão) de uma tarefa', function () {
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
    
    payloadTask = { 
      collaboratorId: collaboratorMock.insertedId,
      statusId: statusMock.insertedIds[0],
      title: 'Título da Tarefa',
      description: 'Uma breve descrição do que se trata a tarefa',
      deadlineDate: '11/06/2011',
    };
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(function () {
    connectMongo.connect.restore();
  });    

  describe('quando criada com sucesso', function () {
    it('retorna um objeto', async function () {
      await taskModel.create(payloadTask); // criar duas tarefas para o teste de delete funcionar
      const response = await taskModel.create(payloadTask);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter o id da tarefa criada', async function () {
      const response = await taskModel.create(payloadTask);

      expect(response).to.have.a.property('insertedId');
    });
  });

  describe('quando todas encontradas com sucesso', function () {
    it('retorna um array', async function () {
      const response = await taskModel.getAll();
      payloadTask = {
        // eslint-disable-next-line no-underscore-dangle
        id: response[0]._id.toString(),
        collaboratorId: collaboratorMock.insertedId,
        statusId: statusMock.insertedIds[1],
        title: 'Título da Tarefa 2',
        description: 'Uma breve descrição do que se trata a tarefa com mais detalhes',
        deadlineDate: '22/06/2011',
      };
      expect(response).to.be.a('array');
    });

    it('criada uma task, o tamanho do array não deve ser igual a zero', async function () {
      const response = await taskModel.getAll();
  
      expect(response.length).not.be.equals(0);
    });
  });

  describe('quando atualizada com sucesso', function () {
    it('retorna um objeto', async function () {
      const response = await taskModel.update(payloadTask);

      expect(response).to.be.a('object');
    });

    it('o objeto deve conter uma atualização feita, ou seja "matchedCount" maior que zero',
     async function () {
      const response = await taskModel.update(payloadTask);
     
      expect(response.matchedCount).not.be.equals(0);
    });
  });

  describe('quando deletada com sucesso', function () {
    it('deve retornar um objeto', async function () {
      const response = await taskModel.deleteOne(payloadTask.id);

      expect(response).to.be.a('object');
    });

    it('task não encontrada para deletar no objeto "deletedCount" igual 0', async function () {
      const response = await taskModel.deleteOne(payloadTask.id);
     
      expect(response.deletedCount).be.equals(0);
    });
  });
});