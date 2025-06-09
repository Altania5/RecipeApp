// RecipeApp/backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 for backend

// Middleware
app.use(express.json()); // Enable JSON body parsing for requests
app.use(cors()); // Enable CORS for all routes (important for frontend communication)

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env");
        process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- Routes (will be defined in separate files) ---
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); // For Spoonacular integration

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes); // Example: /api/recipes/search

// Basic route for testing server status
app.get('/', (req, res) => {
    res.send('Recipe App Backend is running!');
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming Request: ${req.method} ${req.originalUrl}`);
  next(); // Pass the request to the next middleware (like cors, express.json, etc.)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});