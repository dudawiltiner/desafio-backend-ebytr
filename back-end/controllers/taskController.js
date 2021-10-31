const status = require('http-status');
const taskService = require('../services/taskService');

const create = async (req, res) => {
  try {
    const { collaboratorId, statusId, title, description, deadlineDate } = req.body;

    const task = await taskService.create({ 
      collaboratorId, statusId, title, description, deadlineDate });
    
    if (task) {
      return res.status(status.CREATED).json({ message: 'Tarefa salva com sucesso' });
    }
  
    return res.status(status.BAD_REQUEST).json({ message: 'Dados inválidos' });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ 
      message: 'Alguma coisa errada aconteceu' });
  }
};

const update = async (req, res) => {
  try {
    const { id, collaboratorId, statusId, title, description, deadlineDate } = req.body;

    const task = await taskService.create({ 
      id, collaboratorId, statusId, title, description, deadlineDate });
    
    if (task) {
      return res.status(status.OK).json({ message: 'Tarefa atualizada com sucesso' });
    }
  
    return res.status(status.BAD_REQUEST).json({ message: 'Id inválido' });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Alguma coisa errada' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.deleteOne({ id });
    
    if (task) {
      return res.status(status.OK).json({ message: 'Tarefa excluída com sucesso' });
    }
  
    return res.status(status.BAD_REQUEST).json({ message: 'Id inválido' });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Alguma coisa errada' });
  }
};

module.exports = { create, update, deleteOne };