const Transaction = require('../models/Transaction');

// API to get pie chart data for selected month
exports.getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Find unique categories and count items for each category
        const pieChartData = await Transaction.aggregate([
            { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } } },
            { $group: { _id: '$product.category', count: { $sum: 1 } } }
        ]);

        res.json(pieChartData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
