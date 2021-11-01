const { ObjectId } = require('mongodb');
const statusModel = require('../models/statusModel');

/**
 * ENCONTRA TODOS OS STATUS PELO MODEL
 * @returns um ARRAY do model Status ou BOOLEAN false
 */

const getOne = async ({ id }) => {
  if (!ObjectId.isValid(id)) { 
    return false; 
  }

  const status = await statusModel.getOne({ id });

  return status;
};

module.exports = { getOne };