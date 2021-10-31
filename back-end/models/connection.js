const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_URL } = process.env;
const { DB_NAME } = process.env;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let schema = null;

/**
 * VAI ABRIR UMA CONEXÃO COM O BANCO DE DADOS
 * @returns SCHEMA gerado após a conexão
 */
const mongo = () => MongoClient
    .connect(DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
   });

const connect = async () => {
  schema = await mongo();
};

/**
 * ESSA FUNÇÃO SERVE PARA NÃO ABRIR UMA NOVA CONEXÃO
 * A CADA REQUISAÇÃO DAS ROTAS --> USADA NOS MODELS
 * @returns o SCHEMA salvo da conexão com o banco de dados
 */
const getDb = () => schema;

module.exports = { connect, getDb };