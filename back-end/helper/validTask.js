const { ObjectId } = require('mongodb');

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

module.exports = { isValidDate, isValidTask, isValidId };