const status = require('http-status');
const statusModel = require('../models/statusModel');

const getAll = async (_req, res) => {
  const statusList = await statusModel.getAll();
  
  return res.status(status.OK).json(statusList);
};

module.exports = { getAll };