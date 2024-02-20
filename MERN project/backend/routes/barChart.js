const express = require('express');
const router = express.Router();
const barChartController = require('../controllers/barChartController');

// API route to get bar chart data for selected month
router.get('/', barChartController.getBarChartData);

module.exports = router;
