const axios = require('axios');
const Transaction = require('../models/Transaction');

// API to initialize the database with seed data
exports.initializeDatabase = async (req, res) => {
    try {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const seedData = response.data;

        // Transform seed data to remove 'product.title' and 'product.price'
        const transformedData = seedData.map(transaction => ({
            id: transaction.id,
            title: transaction.title,
            price: transaction.price,
            description: transaction.description,
            category: transaction.category,
            image: transaction.image,
            sold: transaction.sold,
            dateOfSale: transaction.dateOfSale,
            
        }));

        // Insert transformed seed data into the database
        await Transaction.insertMany(transformedData);

        // Send success response
        res.json({ message: 'Database initialized successfully' });
    } catch (error) {
        console.error('Error initializing database:', error.message);
        res.status(500).json({ error: error.message });
    }
};
