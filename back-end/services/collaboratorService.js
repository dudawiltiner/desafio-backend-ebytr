const { ObjectId } = require('mongodb');
const collaboratorModel = require('../models/collaboratorModel');

const isValidEmail = (collaboratorEmail) => {
  const re = /\S+@\S+\.\S+/;
  // console.log(re.test(collaboratorEmail));
  if (!collaboratorEmail || typeof collaboratorEmail !== 'string') {
    return false;
  }

  if (!re.test(collaboratorEmail)) {
    return false;
  }

  return true;
};

const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  if (password.length < 6) {
    return false;
  }

  return true;
};

const getOne = async ({ collaboratorEmail, collaboratorPassword }) => {
  if (!isValidEmail(collaboratorEmail) || !isValidPassword(collaboratorPassword)) {
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