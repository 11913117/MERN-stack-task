const Transaction = require('../models/Transaction');

// API to get bar chart data for selected month
exports.getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // console.log('Received month value:', month);

        // Ensure month is a valid number between 1 and 12
        const parsedMonth = parseInt(month);
        if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
            throw new Error('Invalid month value. Month must be a number between 1 and 12.');
        }

        console.log('Selected month:', parsedMonth);

        // Define price ranges
        const priceRanges = [
            { range: '0 - 100', min: 0, max: 100 },
            { range: '101 - 200', min: 101, max: 200 },
            { range: '201 - 300', min: 201, max: 300 },
            { range: '301 - 400', min: 301, max: 400 },
            { range: '401 - 500', min: 401, max: 500 },
            { range: '501 - 600', min: 501, max: 600 },
            { range: '601 - 700', min: 601, max: 700 },
            { range: '701 - 800', min: 701, max: 800 },
            { range: '801 - 900', min: 801, max: 900 },
            { range: '901 - above', min: 901, max: Infinity }
        ];

        // Calculate number of items in each price range
        const barChartData = [];
        for (const range of priceRanges) {
            const count = await Transaction.countDocuments({ $and: [{ $expr: { $eq: [{ $month: { date: '$dateOfSale', timezone: '+05:30' } }, parsedMonth] } }, { 'price': { $gte: range.min, $lte: range.max } }] });
            barChartData.push({ range: range.range, count });
        }

        res.json(barChartData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error.message);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
