const { ObjectId } = require('mongodb');
const { dateNow } = require('../helper/helperDate');
const connectMongo = require('./connection');

// CREATE ONE 
const create = async ({ 
    collaboratorId, 
    statusId, 
    title, 
    description,  
    deadlineDate }) => {
  const db = await connectMongo.getDb();
  
  const task = await db.collection('tasks').insertOne({ 
    collaboratorId: ObjectId(collaboratorId), 
    statusId: ObjectId(statusId), 
    title, 
    description, 
    createdDate: dateNow(),
    updateDate: dateNow(),
    deadlineDate });
  
  return task;
};

// READ MANY 
const getAll = async () => {
  const db = await connectMongo.getDb();
  const tasks = await db.collection('tasks').aggregate([{ 
    $lookup: { 
      from: 'status', 
      localField: 'statusId', 
      foreignField: '_id', 
      as: 'statusTask' }, 
  },
  { 
    $lookup: { 
      from: 'collaborators', 
      localField: 'collaboratorId', 
      foreignField: '_id', 
      as: 'collaboratorTask' }, 
  }]).toArray();
  
  return tasks;
};

// UPDATE ONE 
const update = async ({ 
    id,
    collaboratorId, 
    statusId, 
    title, 
    description,  
    deadlineDate }) => {
  const db = await connectMongo.getDb();

  const task = await db.collection('tasks')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { 
    collaboratorId: ObjectId(collaboratorId), 
    statusId: ObjectId(statusId), 
    title, 
    description, 
    updateDate: dateNow(),
    deadlineDate } });

  return task;
};

// DELETE ONE 
const deleteOne = async ({ id }) => {
const db = await connectMongo.getDb();

const task = await db.collection('tasks').deleteOne({ _id: ObjectId(id) });

return task;
};

module.exports = { create, getAll, update, deleteOne };