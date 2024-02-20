const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// API route to get statistics for selected month
router.get('/', statisticsController.getStatistics);

module.exports = router;
