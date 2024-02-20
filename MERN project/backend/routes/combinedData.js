const express = require('express');
const router = express.Router();
const combinedDataController = require('../controllers/combinedDataController');

// API route to fetch combined data from all APIs
router.get('/', combinedDataController.getCombinedData);

module.exports = router;
