const { ObjectId } = require('mongodb');
const statusModel = require('../models/statusModel');

const getOne = async ({ id }) => {
  if (!ObjectId.isValid(id)) { 
    return false; 
  }

  const status = await statusModel.getOne({ id });

  return status;
};

module.exports = { getOne };