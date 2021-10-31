require('dotenv').config();
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { DB_NAME } = process.env;

/**
 * GERA UM BANCO DE DADOS EM MEMÓRIA PARA SERVIR DE "DOUBLE"
 * @param {*} connectMongo o banco que vai fazer a conexão
 * @returns uma conexão "mockada"
 */

const mockMongo = async (connectMongo) => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();
  
  const connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME));
  
  sinon.stub(connectMongo, 'connect').resolves(connectionMock);

  return connectionMock;
};

module.exports = { mockMongo };