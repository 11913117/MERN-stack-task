const axios = require('axios');

// API to fetch combined data from all APIs
exports.getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        // Make asynchronous calls to fetch data from each API endpoint
        const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
            axios.get(`http://localhost:5000/api/statistics?month=${month}`),
            axios.get(`http://localhost:5000/api/bar-chart?month=${month}`),
            axios.get(`http://localhost:5000/api/pie-chart?month=${month}`)
        ]);

        // Extract data from each response
        const statisticsData = statisticsResponse.data;
        const barChartData = barChartResponse.data;
        const pieChartData = pieChartResponse.data;

        // Combine the data as needed
        const combinedData = {
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData
            // Add more data if needed from other APIs
        };

        // Send the final combined data as the response
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
