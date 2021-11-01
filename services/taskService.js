const { ObjectId } = require('mongodb');
const taskModel = require('../models/taskModel');
const { isValidDate, isValidTask, isValidId } = require('../helper/validTask');

/**
 * CRIA UMA NOVA TAREFA PELO MODEL
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id do colaborador, o id do status
 * , títula da tarefa, descrição
 * @returns um OBJETO do model Task ou BOOLEAN false 
 */

const create = async ({ 
  collaboratorId, 
  statusId, 
  title, 
  description,  
  deadlineDate }) => {
  if (!isValidId(collaboratorId, statusId) 
  || !isValidTask(title, description) || !isValidDate(deadlineDate)) {
    return false;
  }
  const task = await taskModel.create({ 
    collaboratorId, 
    statusId, 
    title, 
    description,
    deadlineDate });

  return task;
};

/**
 * ATUALIZA UMA TAREFA PELO MODEL
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id da tarefa, podendo conter o id do colaborador, o id do status
 * , títula da tarefa, descrição
 * @returns um OBJETO do model Task ou BOOLEAN false 
 */

const update = async ({ 
  id,
  collaboratorId, 
  statusId, 
  title, 
  description,  
  deadlineDate }) => {
    console.log(id);
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const task = await taskModel.update({ 
    id,
    collaboratorId, 
    statusId, 
    title, 
    description,  
    deadlineDate });

  return task;
  };

/**
 * DELETA UMA TAREFA PELO MODEL
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id da tarefa
 * @returns um OBJETO do model Task ou BOOLEAN false  
 */

const deleteOne = async ({ id }) => {
  if (!ObjectId.isValid(id)) { 
    return false;
  }

  const res = await taskModel.deleteOne({ id });
  
  return res;
  };

module.exports = { create, update, deleteOne };