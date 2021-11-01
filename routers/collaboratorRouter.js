const express = require('express');
const collaboratorController = require('../controllers/collaboratorController');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

// AUTENTICAÇÃO
router.post('/', tokenController.isValid, collaboratorController.getOne);

// GET ALL
router.get('/', tokenController.isValid, collaboratorController.getAll);

module.exports = router;