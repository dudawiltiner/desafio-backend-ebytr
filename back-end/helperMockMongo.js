const mockMongo = async ({ sinon, MongoMemoryServer, MongoClient, DB_NAME, connectMongo }) => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();
  
  const connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME));
  
  sinon.stub(connectMongo, 'connect').resolves(connectionMock);

  return connectionMock;
};

module.exports = { mockMongo };