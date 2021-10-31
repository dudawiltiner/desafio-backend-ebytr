const { ObjectId } = require('mongodb');
const connectMongo = require('./connection');

// READ MANY 
const getAll = async () => {
  const db = await connectMongo.getDb();
  const status = await db.collection('status').find().toArray();
  
  return status;
};

// READ ONE 
const getOne = async ({ id }) => {
  const db = await connectMongo.getDb();
  const status = await db.collection('status').findOne({ 
    _id: ObjectId(id), 
  });

  return status;
};

module.exports = { getAll, getOne };