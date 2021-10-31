const express = require('express');
const collaboratorController = require('../controllers/collaboratorController');

const router = express.Router();

// AUTENTICAÇÃO
router.post('/', collaboratorController.getOne);

module.exports = router;