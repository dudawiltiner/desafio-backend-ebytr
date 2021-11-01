const { ObjectId } = require('mongodb');
const { dateNow } = require('../helper/helperDate');
const connectMongo = require('./connection');

/**
 * CRIA UMA NOVA TAREFA NO BANCO DE DADOS
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id do colaborador, o id do status
 * , títula da tarefa, descrição
 * @returns um OBJETO da consulta ao banco de dados na coleção "tasks" 
 */

// CREATE ONE 
const create = async ({ 
    collaboratorId, 
    statusId, 
    title, 
    description,  
    deadlineDate }) => {
  let db = await connectMongo.getDb();

  if (db === null) db = await connectMongo.connect();
  
  const task = await db.collection('tasks').insertOne({ 
    collaboratorId: ObjectId(collaboratorId), 
    statusId: ObjectId(statusId), 
    title, 
    description, 
    createdDate: dateNow(),
    updateDate: dateNow(),
    deadlineDate });
  
  return task;
};

/**
 * ECONTRA TODAS AS TAREFAS REGISTRADAS
 * @returns um ARRAY da consulta ao banco de dados na coleção "tasks" 
 */

// READ MANY 
const getAll = async () => {
  let db = await connectMongo.getDb();

  if (db === null) db = await connectMongo.connect();
  const tasks = await db.collection('tasks').aggregate([{ 
    $lookup: { 
      from: 'status', 
      localField: 'statusId', 
      foreignField: '_id', 
      as: 'statusTask' }, 
  },
  { 
    $lookup: { 
      from: 'collaborators', 
      localField: 'collaboratorId', 
      foreignField: '_id', 
      as: 'collaboratorTask' }, 
  }]).toArray();
  
  return tasks;
};

/**
 * ATUALIZA UMA TAREFA NO BANCO DE DADOS
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id da tarefa, podendo conter o id do colaborador, o id do status
 * , títula da tarefa, descrição
 * @returns um OBJETO da consulta ao banco de dados na coleção "tasks" 
 */

// UPDATE ONE 
const update = async ({ 
    id,
    collaboratorId, 
    statusId, 
    title, 
    description,  
    deadlineDate }) => {
  let db = await connectMongo.getDb();

  if (db === null) db = await connectMongo.connect();

  const task = await db.collection('tasks')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { 
    collaboratorId: ObjectId(collaboratorId), 
    statusId: ObjectId(statusId), 
    title, 
    description, 
    updateDate: dateNow(),
    deadlineDate } });

  return task;
};

/**
 * DELETA UMA TAREFA NO BANCO DE DADOS
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id da tarefa
 * @returns um OBJETO da consulta ao banco de dados na coleção "tasks" 
 */

// DELETE ONE 
const deleteOne = async ({ id }) => {
  let db = await connectMongo.getDb();

  if (db === null) db = await connectMongo.connect();

  const task = await db.collection('tasks').deleteOne({ _id: ObjectId(id) });

  return task;
};

module.exports = { create, getAll, update, deleteOne };