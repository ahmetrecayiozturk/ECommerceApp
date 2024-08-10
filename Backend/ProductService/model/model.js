const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    seller: {
        type: String,
        required: false,
    },
    category: {
        type: [String],
        required: true,
        enum : ['Electronics','Books','Clothing','Furniture','Other'],
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const ProductModel = mongoose.model('MyProductsDataBase', productSchema);

module.exports = ProductModel;