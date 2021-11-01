const { ObjectId } = require('mongodb');
const collaboratorModel = require('../models/collaboratorModel');
const { isValidEmail, isValidPassword } = require('../helper/validCollaborator');

/**
 * ENCONTRA O USUÁRIO PELO MODEL
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: email e password do colaborador
 * @returns um ARRAY do model Collaborator ou BOOLEAN false
 */

const getOne = async ({ collaboratorEmail, collaboratorPassword }) => {
  if (!isValidEmail(collaboratorEmail) || !isValidPassword(collaboratorPassword)) {
    return false;
  }

  const collaborator = await collaboratorModel.getOne({ collaboratorEmail, collaboratorPassword });
  
  return collaborator;
};

/**
 * ENCONTRA O COLABORADOR PELO ID DO MODEL --> VAI SERVIR PARA VERIFICAÇÃO DO TOKEN JWT
 * @param {*} param0 um parâmetro OBJETO que possue como chaves: id
 * @returns um ARRAY do model Collaborator ou BOOLEAN false
 */

const findId = async ({ id }) => {
  if (!ObjectId.isValid(id)) { 
    return false; 
  }

  const collaborator = await collaboratorModel.findId({ id });

  return collaborator;
};

module.exports = { getOne, findId };