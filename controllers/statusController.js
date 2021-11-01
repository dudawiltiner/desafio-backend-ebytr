const status = require('http-status');
const statusModel = require('../models/statusModel');

/**
 * CONFIGURAÇÃO DO MIDDLEWARE PARA A LEITURA DOS STATUS 
 * @param {*} req // recebe a requisição
 * @param {*} res // resebe a resposta
 * @returns um status + json (array)
 */

const getAll = async (_req, res) => {
  const statusList = await statusModel.getAll();

  return res.status(status.OK).json(statusList);
};

module.exports = { getAll };