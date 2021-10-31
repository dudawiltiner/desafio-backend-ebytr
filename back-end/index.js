require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectMongo = require('./models/connection');

connectMongo.connect();

const app = express();

app.use(cors()); // <---- usar cors middleware para conseguir fazer o fetch pelo front-end
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

// ATUTENTICA O COLABORADOR
const collaboratorRouter = require('./routers/collaboratorRouter');

app.use('/collaborator', collaboratorRouter);

// ADQUIRI TODOS OS STATUS
const statusRouter = require('./routers/statusRouter');

app.use('/status', statusRouter);

// CRUD DAS TAREFAS
const taskRouter = require('./routers/taskRouter');

app.use('/task', taskRouter);

app.listen(PORT, () => { console.log(`Api rodando na porta ${PORT}`); });
