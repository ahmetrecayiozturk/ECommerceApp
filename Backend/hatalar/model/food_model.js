const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const foodSchema = new Schema({
    id:{
        //random id
    type: String,
    default: uuidv4, // Generate a random UUID for the id
    unique: true // Ensure the id is unique
    },
    name:{
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    preparing: {
        type: String,
        required: true
    }
});

const FoodModel = mongoose.model('MyFoodDatabase', foodSchema);

module.exports = FoodModel;
