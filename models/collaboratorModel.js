const { ObjectId } = require('mongodb');
const connectMongo = require('./connection');

/**
 * ENCONTRA O USUÁRIO CADASTRADO NO BANCO DE DADOS
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: email e password do colaborador
 * @returns um OBJETO da consulta ao banco de dados na coleção "collaborators"
 */

// READ ONE 
const getOne = async ({ collaboratorEmail, collaboratorPassword }) => {
  let db = await connectMongo.getDb();

  if (db === null) db = await connectMongo.connect();
  const collaborator = await db.collection('collaborators').findOne(
    { 
      collaboratorEmail, 
      collaboratorPassword, 
    },
);

  return collaborator;
};

/**
 * ENCONTRA O COLABORADOR PELO ID 
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id
 * @returns um OBJETO da consulta ao banco de dados na coleção "collaborators"
 */

// READ ID
const findId = async ({ id }) => {
  let db = await connectMongo.getDb();

  if (db === null) db = await connectMongo.connect();
  const collaborator = await db.collection('collaborators').findOne(
    { 
      _id: ObjectId(id), 
    },
);

  return collaborator;
};

/**
 * ECONTRA TODOS OS COLABORADORES REGISTRADAS
 * @returns um ARRAY da consulta ao banco de dados na coleção "collaborators" 
 */

// READ MANY 
const getAll = async () => {
  let db = await connectMongo.getDb();

  if (db === null) db = await connectMongo.connect();

  const status = await db.collection('collaborators').find().toArray();
  
  return status;
};

module.exports = { getOne, findId, getAll };