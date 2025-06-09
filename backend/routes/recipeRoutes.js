// RecipeApp/backend/routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Ingredient = require('../models/Ingredient'); // To fetch user's ingredients

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// @route   GET /api/recipes/search
// @desc    Search recipes based on available ingredients
// @access  Public (for now)
router.get('/search', async (req, res) => {
    if (!SPOONACULAR_API_KEY) {
        return res.status(500).json({ msg: 'Spoonacular API key not configured.' });
    }

    try {
        // 1. Fetch user's available ingredients from your database
        const userIngredients = await Ingredient.find({});
        const ingredientNames = userIngredients.map(ing => ing.name).join(','); // Comma-separated list

        // 2. Call Spoonacular API
        // For learning, we'll use 'findByIngredients'.
        // maxReadyTime, ranking (1 for minimize missing ingredients), etc. are good options.
        const spoonacularResponse = await axios.get(`${SPOONACULAR_BASE_URL}/findByIngredients`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                ingredients: ingredientNames,
                number: 10, // Number of recipes to return
                ranking: 1, // Minimize missing ingredients
                ignorePantry: true // Don't use common pantry items if not explicitly listed
            }
        });

        res.json(spoonacularResponse.data); // Send Spoonacular results directly
    } catch (error) {
        console.error('Error fetching recipes from Spoonacular:', error.response ? error.response.data : error.message);
        res.status(500).send('Error searching for recipes');
    }
});

// You could add a route to get specific recipe details if Spoonacular API supports it
// e.g., router.get('/:id/information', ...)

module.exports = router;