// backend/controllers/statisticsController.js

const Transaction = require('../models/Transaction');

// API to get statistics for selected month
exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        // Calculate total sale amount of selected month
        const totalSaleAmount = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: { $toDate: '$dateOfSale' } }, parseInt(month)] }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$price' }
                }
            }
        ]);

        // Calculate total number of sold items of selected month
        const totalSoldItems = await Transaction.countDocuments({
            $expr: { $eq: [{ $month: { $toDate: '$dateOfSale' } }, parseInt(month)] },
            sold: true
        });

        // Calculate total number of not sold items of selected month
        const totalNotSoldItems = await Transaction.countDocuments({
            $expr: { $eq: [{ $month: { $toDate: '$dateOfSale' } }, parseInt(month)] },
            sold: false
        });

        res.json({
            totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error('Error fetching statistics:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
