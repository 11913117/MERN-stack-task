const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// API route to list all transactions with search and pagination
router.get('/', transactionController.getAllTransactions);

module.exports = router;
