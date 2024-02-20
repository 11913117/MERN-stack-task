// backend/controllers/transactionController.js

const Transaction = require('../models/Transaction');

// API to list all transactions with search and pagination
exports.getAllTransactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '' } = req.query;
        const skip = (page - 1) * perPage;
        const limit = parseInt(perPage);

        // Construct query for search
        const query = {};

        // If search parameter is provided, add search conditions
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } }
            ];
        }

        // Fetch transactions with pagination and search
        const transactions = await Transaction.find(query)
            .skip(skip)
            .limit(limit);

        // Count total number of transactions for pagination
        const totalCount = await Transaction.countDocuments(query);

        res.json({
            transactions,
            totalCount,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / perPage)
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
