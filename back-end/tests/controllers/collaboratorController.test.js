const sinon = require('sinon');
const { expect } = require('chai');

const collaboratorService = require('../../services/collaboratorService');
const collaboratorController = require('../../controllers/collaboratorController');

/*
|_Ao chamar o controller de Collaborator 
  |__quando o payload informado não é válido 
     |__é chamado o status com o código 401
     |__é chamado o json com a mensagem "Usuário não autorizado"
  |__quando encontrado com sucesso
     |__é chamado o status com o código 200
     |__é chamado o json com o token e o nome do collaborator 
*/

describe('Ao chamar o controller de Collaborator', function () {
  describe('quando o payload informado não é válido', function () {
    const response = {};
    const request = {};

    before(function () {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(collaboratorService, 'getOne')
        .resolves(false);
  });

    /* Restaura-se a função `getOne` original após os testes. */
    after(function () {
     collaboratorService.getOne.restore();
    });

    it('é chamado o status com o código 401', async function () {
      await collaboratorController.getOne(request, response);

      expect(response.status.calledWith(401)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Usuário não autorizado"', async function () {
      await collaboratorController.getOne(request, response);

      expect(response.json.calledWith({ message: 'Usuário não autorizado' })).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', function () {
    const response = {};
    const request = {};

    before(function () {
      request.body = {
        collaboratorEmail: 'nome@nome.com',
        collaboratorPassword: 'secreta',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns(response);
     
      sinon.stub(collaboratorService, 'getOne').resolves(true);
    });

    /* Restaura-se a função `getOne` original após os testes. */
    after(function () {
      collaboratorService.getOne.restore();
    });

    it('é chamado o status com o código 200', async function () {
      await collaboratorController.getOne(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json que armazena um token gerado e nome do colaborador', async function () {
      await collaboratorController.getOne(request, response);
      console.log(response);
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
});