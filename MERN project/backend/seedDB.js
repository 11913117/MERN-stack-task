const axios = require('axios');
const Transaction = require('./models/Transaction');

const seedDatabase = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Transform transactions to match the desired format
        const formattedTransactions = transactions.map(transaction => ({
            id: transaction.id,
            title: transaction.title,
            price: transaction.price,
            description: transaction.description,
            category: transaction.category,
            image: transaction.image,
            sold: false, // Assuming all fetched items are not sold initially
            dateOfSale: transaction.dateOfSale
        }));

        await Transaction.insertMany(formattedTransactions);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    }
};

seedDatabase();
