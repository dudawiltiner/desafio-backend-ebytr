const { ObjectId } = require('mongodb');
const taskModel = require('../models/taskModel');

const isValidId = (collaboratorId, statusId) => {
    if (!ObjectId.isValid(collaboratorId)) {
      return false;
    }

    if (!ObjectId.isValid(statusId)) {
      return false;
    }

    return true;
};

const isValidTask = (title, description) => {
  if (!title || typeof title !== 'string') {
    return false;
  }

  if (!description || typeof description !== 'string') {
    return false;
  }

  return true;
};

const isValidDate = (deadlineDate) => {
  if (!deadlineDate || typeof deadlineDate !== 'string') {
    return false;
  }

  return true;
};

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

const update = async ({ 
  id,
  collaboratorId, 
  statusId, 
  title, 
  description,  
  deadlineDate }) => {
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
  if (!ObjectId.isValid(id)) { 
    return false;
  }

  const res = await taskModel.deleteOne(id);
  
  return res;
  };

module.exports = { create, update, deleteOne };