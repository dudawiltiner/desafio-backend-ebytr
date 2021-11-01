const express = require('express');
const statusController = require('../controllers/statusController');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

// ADQUIRIR UM ARRAY
router.get('/', tokenController.isValid, statusController.getAll);

module.exports = router;