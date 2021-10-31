const { ObjectId } = require('mongodb');

/**
 * VALIDA OS ID'S DO COLABORADOR E DO STATUS
 * @param {*} collaboratorId uma STRING -> id
 * @param {*} statusId uma STRING -> id
 * @returns um BOOLEAN true ou false
 */

const isValidId = (collaboratorId, statusId) => {
  if (!ObjectId.isValid(collaboratorId)) {
    return false;
  }

  if (!ObjectId.isValid(statusId)) {
    return false;
  }

  return true;
};

/**
 * VALIDA O TÍTULO E A DESCRIÇÃO DE UMA TAREFA
 * @param {*} title uma STRING -> título da tarefa
 * @param {*} description uma STRING -> descrição da tarefa
 * @returns um BOOLEAN true ou false
 */

const isValidTask = (title, description) => {
if (!title || typeof title !== 'string') {
  return false;
}

if (!description || typeof description !== 'string') {
  return false;
}

return true;
};

/**
 * VALIDA O PRAZO DATA
 * @param {*} deadlineDate uma STRING -> prazo da tarefa
 * @returns um BOOLEAN true ou false
 */

const isValidDate = (deadlineDate) => {
if (!deadlineDate || typeof deadlineDate !== 'string') {
  return false;
}

return true;
};

module.exports = { isValidDate, isValidTask, isValidId };