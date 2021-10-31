const { ObjectId } = require('mongodb');
const taskModel = require('../models/taskModel');
const { validTask } = require('../helper/validCollaborator');

const create = async ({ 
  collaboratorId, 
  statusId, 
  title, 
  description,  
  deadlineDate }) => {
  if (!validTask.isValidId(collaboratorId, statusId) 
  || !validTask.isValidTask(title, description) || !validTask.isValidDate(deadlineDate)) {
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

const deleteOne = async (id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) { 
    return false;
  }

  const res = await taskModel.deleteOne(id);
  
  return res;
  };

module.exports = { create, update, deleteOne };