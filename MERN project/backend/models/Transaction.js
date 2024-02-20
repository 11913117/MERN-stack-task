const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    sold: { type: Boolean, default: false },
    dateOfSale: { type: Date }
});

module.exports = mongoose.model('Transaction', transactionSchema);
