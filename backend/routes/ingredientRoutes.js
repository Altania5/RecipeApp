// RecipeApp/backend/routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// @route   GET /api/ingredients
// @desc    Get all ingredients
// @access  Public (for now)
router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find({}); // Fetch all ingredients
        res.json(ingredients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/ingredients
// @desc    Add a new ingredient
// @access  Public (for now)
router.post('/', async (req, res) => {
    const { name, quantity, unit } = req.body;

    try {
        const newIngredient = new Ingredient({
            name,
            quantity,
            unit
        });

        const ingredient = await newIngredient.save();
        res.status(201).json(ingredient); // 201 Created
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/ingredients/:id
// @desc    Delete an ingredient
// @access  Public (for now)
router.delete('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);

        if (!ingredient) {
            return res.status(404).json({ msg: 'Ingredient not found' });
        }

        res.json({ msg: 'Ingredient removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;