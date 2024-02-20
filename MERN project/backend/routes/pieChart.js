const express = require('express');
const router = express.Router();
const pieChartController = require('../controllers/pieChartController');

// API route to get pie chart data for selected month
router.get('/', pieChartController.getPieChartData);

module.exports = router;
