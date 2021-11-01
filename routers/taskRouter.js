const express = require('express');
const tokenController = require('../controllers/tokenController');
const taskController = require('../controllers/taskController');

const router = express.Router();

// CRIA UMA TAREFA
router.post('/', tokenController.isValid, taskController.create);

// ATUALIZA UMA TAREFA
router.put('/', tokenController.isValid, taskController.update);

// PEGA TODAS AS TAREFAS
router.get('/', tokenController.isValid, taskController.getAll);

// DELETA UMA TAREFA
router.delete('/:id', tokenController.isValid, taskController.deleteOne);

module.exports = router;
