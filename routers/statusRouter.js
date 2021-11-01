const express = require('express');
const statusController = require('../controllers/statusController');

const router = express.Router();

// ADQUIRIR UM ARRAY
router.get('/', statusController.getAll);

module.exports = router;