const sinon = require('sinon');
const { expect } = require('chai');

const statusModel = require('../../models/statusModel');
const statusController = require('../../controllers/statusController');

/*
|_Ao chamar o controller de Satus 
  |__quando encontrado com sucesso
     |__é chamado o status com o código 200
     |__é chamado um array com todos os status
     |__é chamado um array com comprimento maior que zero 
*/

describe('CONTROLLER: Ao chamar o controller de Status', function () {
  describe('quando todos são encontrados com sucesso', function () {
    const response = {};
    const request = {};

    before(function () {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
     
      sinon.stub(statusModel, 'getAll').resolves(true);
    });

    /* Restaura-se a função `getAll` original após os testes. */
    after(function () {
      statusModel.getAll.restore();
    });

    it('é chamado o status com o código 200', async function () {
      await statusController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado um json com o array com todos os status', async function () {
      await statusController.getAll(request, response);
      
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
});