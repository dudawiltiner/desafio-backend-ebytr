/* eslint-disable max-lines */
const sinon = require('sinon');
const { expect } = require('chai');
// const { ObjectId } = require('mongodb');

const taskService = require('../../services/taskService');
const taskController = require('../../controllers/taskController');
const { mockMongo } = require('../../helper/helperMockMongo');
const connectMongo = require('../../models/connection');

/*
|_Ao chamar o controller de Satus 
  |__para criar, quando o payload informado não é válido 
     |__é chamado o status com o código 400
     |__é chamado o json com a mensagem "Dados inváldos"
  |__quando criado com sucesso
     |__é chamado o status com o código 201
     |__é chamado o json com a mensagem "Tarefa salva com sucesso"
  |__para atualizar, quando o id informado não é válido 
     |__é chamado o status com o código 400
     |__é chamado o json com a mensagem "Id inváldo
  |__quando criado com sucesso
     |__é chamado o status com o código 200
     |__é chamado o json com a mensagem "Tarefa atualiza com sucesso"
  |__para criar, quando o payload informado não é válido 
     |__é chamado o status com o código 400
     |__é chamado o json com a mensagem "Id inváldos"
  |__quando criado com sucesso
     |__é chamado o status com o código 200
     |__é chamado o json com a mensagem "Tarefa deletada com sucesso"
*/

describe('CONTROLLER: Ao chamar o controller de Task', function () {
  let taskId = {};

  describe('quando o payload informado não é válido', function () {
    const response = {};
    const request = {};

    before(function () {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(taskService, 'create')
        .resolves(false);
  });

    /* Restaura-se a função `create` original após os testes. */
    after(function () {
     taskService.create.restore();
    });

    it('é chamado o seguinte status: 400', async function () {
      await taskController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async function () {
      await taskController.create(request, response);

      expect(response.json.calledWith({ message: 'Dados inválidos' })).to.be.equal(true);
    });
  });

  describe('quando é criada com sucesso', function () {
    const response = {};
    const request = {};

    before(function () {
      request.body = {
        collaboratorId: '5bf142459b72e12b2b1b2cd',
        statusId: '5bf142457b78e12u2b1b2pl',
        title: 'Título da Tarefa',
        description: 'Uma breve descrição do que se trata a tarefa',
        deadlineDate: '11/06/2011',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
     
      sinon.stub(taskService, 'create').resolves(true);
    });

    /* Restaura-se a função `create` original após os testes. */
    after(function () {
      taskService.create.restore();
    });

    it('é chamado o status com o código 201', async function () {
      await taskController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json que possue a mensagem "Tarefa salva com sucesso"', async function () {
      await taskController.create(request, response);
     
      expect(response.json.calledWith({ message: 'Tarefa salva com sucesso' })).to.be.equal(true);
    });
  });

  describe('para atualizar, quando o id informado não é válido', function () {
    const response = {};
    const request = {};

    before(function () {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(taskService, 'update')
        .resolves(false);
  });

    /* Restaura-se a função `update` original após os testes. */
    after(function () {
     taskService.update.restore();
    });

    it('é chamado o status com o código 400', async function () {
      await taskController.update(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Id inválidos"', async function () {
      await taskController.update(request, response);

      expect(response.json.calledWith({ message: 'Id inválido' })).to.be.equal(true);
    });
  });

  describe('quando é atualizada com sucesso', function () {
    const response = {};
    const request = {};
    let connectionMock;

    before(async function () {
      connectionMock = await mockMongo(connectMongo); 

      const newTask = {
        collaboratorId: '5bf142459b72e12b2b1b2cd',
        statusId: '5bf142457b78e12u2b1b2pl',
        title: 'Título da Tarefa 2',
        description: 'Uma breve descrição do que se trata a tarefa 2',
        deadlineDate: '11/06/2011',
      };
  
      const taskMock = await connectionMock.collection('tasks').insertOne(newTask);
      
      taskId = { 
        id: taskMock.insertedId.toString(),
      };
      
      request.body = newTask;
      request.body.id = taskId.id;
    
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
     
      sinon.stub(taskService, 'update').resolves(true);
    });

    /* Restaura-se a função `update` original após os testes. */
    after(function () {
      taskService.update.restore();
      connectMongo.connect.restore();
    });

    it('é chamado o status com o código 200', async function () {
      await taskController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json que possue a mensagem "Tarefa atualizada com sucesso"', async function () {
      await taskController.update(request, response);
     
      expect(response.json.calledWith({ 
        message: 'Tarefa atualizada com sucesso' })).to.be.equal(true);
    });
  });

  describe('para excluir, quando o id informado não é válido', function () {
    const response = {};
    const request = {};

    before(function () {
      request.params = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(taskService, 'deleteOne')
        .resolves(false);
  });

    /* Restaura-se a função `deleteOne` original após os testes. */
    after(function () {
     taskService.deleteOne.restore();
    });

    it('é chamado o status com o código 400', async function () {
      await taskController.deleteOne(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Id inválido"', async function () {
      await taskController.deleteOne(request, response);

      expect(response.json.calledWith({ message: 'Id inválido' })).to.be.equal(true);
    });
  });

  describe('quando é excluída com sucesso', function () {
    const response = {};
    const request = {};

    before(function () {
      request.params = taskId;

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
     
      sinon.stub(taskService, 'deleteOne').resolves(true);
    });

    /* Restaura-se a função `deleteOne` original após os testes. */
    after(function () {
      taskService.deleteOne.restore();
    });

    it('é chamado o status com o código 200', async function () {
      await taskController.deleteOne(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json que possue a mensagem "Tarefa excluída com sucesso"', async function () {
      await taskController.deleteOne(request, response);
     
      expect(response.json.calledWith({ 
        message: 'Tarefa excluída com sucesso' })).to.be.equal(true);
    });
  });
});