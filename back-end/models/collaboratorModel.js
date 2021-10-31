const { ObjectId } = require('mongodb');
const connectMongo = require('./connection');

/**
 * ENCONTRA O USUÁRIO CADASTRADO NO BANCO DE DADOS
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: email e password do colaborador
 * @returns um OBJETO da consulta ao banco de dados na coleção "collaborators"
 */

// READ ONE 
const getOne = async ({ collaboratorEmail, collaboratorPassword }) => {
  const db = await connectMongo.getDb();
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
  const db = await connectMongo.getDb();
  const collaborator = await db.collection('collaborators').findOne(
    { 
      _id: ObjectId(id), 
    },
);

  return collaborator;
};

module.exports = { getOne, findId };