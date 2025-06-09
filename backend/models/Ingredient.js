// RecipeApp/backend/models/Ingredient.js
const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: false, // Unit might not always be applicable (e.g., "3 apples")
        trim: true
    },
    // You could add userId if you plan for multiple users later
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);