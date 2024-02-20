const express = require('express');
const router = express.Router();
const initializeDatabaseController = require('../controllers/initializeDatabaseController');

// API route to initialize the database with seed data
router.get('/', initializeDatabaseController.initializeDatabase);

module.exports = router;
