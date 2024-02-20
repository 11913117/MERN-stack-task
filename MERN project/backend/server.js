
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statistics');
const barChartRoutes = require('./routes/barChart');
const pieChartRoutes = require('./routes/pieChart');
const combinedDataRoutes = require('./routes/combinedData');
const initializeDatabaseRoutes = require('./routes/initializeDatabase');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/bar-chart', barChartRoutes);
app.use('/api/pie-chart', pieChartRoutes);
app.use('/api/combined-data', combinedDataRoutes);
app.use('/api/initialize-database', initializeDatabaseRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mern_coding_challenge', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.error('MongoDB connection error:', error.message));
