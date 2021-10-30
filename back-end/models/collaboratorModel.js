const { ObjectId } = require('mongodb');
const connectMongo = require('./connection');

const getOne = async ({ collaboratorEmail, collaboratorPassword }) => {
  const db = await connectMongo.connect();
  const collaborator = await db.collection('collaborators').findOne(
    { 
      collaboratorEmail, 
      collaboratorPassword, 
    },
);

  return collaborator;
};

const findId = async ({ id }) => {
  const db = await connectMongo.connect();
  const collaborator = await db.collection('collaborators').findOne(
    { 
      _id: ObjectId(id), 
    },
);

  return collaborator;
};

module.exports = { getOne, findId };