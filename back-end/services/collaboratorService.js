const { ObjectId } = require('mongodb');
const collaboratorModel = require('../models/collaboratorModel');
const { validCollaborator } = require('../helper/validCollaborator');

const getOne = async ({ collaboratorEmail, collaboratorPassword }) => {
  if (!validCollaborator.isValidEmail(collaboratorEmail) 
  || !validCollaborator.isValidPassword(collaboratorPassword)) {
    return false;
  }

  const collaborator = await collaboratorModel.getOne({ collaboratorEmail, collaboratorPassword });
  // console.log(collaborator);
  return collaborator;
};

const findId = async ({ id }) => {
  if (!ObjectId.isValid(id)) { 
    return false; 
  }

  const collaborator = await collaboratorModel.findId({ id });

  return collaborator;
};

module.exports = { getOne, findId };