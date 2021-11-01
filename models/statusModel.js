const { ObjectId } = require('mongodb');
const connectMongo = require('./connection');

/**
 * ENCONTRA TODOS OS STATUS DESPONÍVEIS PARA AS TAREFAS
 * @returns um ARRAY com todos os status após a consulta ao banco de dados na coleção "status"
 */

// READ MANY 
const getAll = async () => {
  const db = await connectMongo.getDb();
  const status = await db.collection('status').find().toArray();
  
  return status;
};

/**
 * ENCONTRA APENAS UM STATUS A PARTIR DO ID
 * @param {*} param0 recebe um OBJETO com o id do status
 * @returns um OBJETO após a consulta ao banco de dados na coleção "status"
 */

// READ ONE 
const getOne = async ({ id }) => {
  const db = await connectMongo.getDb();
  const status = await db.collection('status').findOne({ 
    _id: ObjectId(id), 
  });

  return status;
};

module.exports = { getAll, getOne };