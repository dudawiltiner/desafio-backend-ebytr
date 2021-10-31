const { ObjectId } = require('mongodb');
const connectMongo = require('./connection');

// READ ONE 
const getOne = async ({ collaboratorEmail, collaboratorPassword }) => {
  const db = await connectMongo.getDb();
  const collaborator = await db.collection('collaborators').findOne(
    { 
      collaboratorEmail, 
      collaboratorPassword, 
    },
);

  return collaborator;
};

// READ ID
const findId = async ({ id }) => {
  const db = await connectMongo.getDb();
  const collaborator = await db.collection('collaborators').findOne(
    { 
      _id: ObjectId(id), 
    },
);

  return collaborator;
};

module.exports = { getOne, findId };