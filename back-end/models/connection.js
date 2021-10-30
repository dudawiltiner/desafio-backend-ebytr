const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_URL } = process.env;
const { DB_NAME } = process.env;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let schema = null;

const mongo = () => MongoClient
    .connect(DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
   });

const connect = async () => {
  schema = await mongo();
  return schema;
};

const getDb = () => schema;

module.exports = { connect, getDb };