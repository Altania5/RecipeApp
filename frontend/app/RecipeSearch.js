import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, Card, Title, Paragraph, ActivityIndicator, Text } from 'react-native-paper';
import axios from 'axios';
import { useRouter } from 'expo-router';

// IMPORTANT: Make sure this is your computer's correct local IP address!
const API_BASE_URL = 'http://45.62.0.139:5000/api'; 

const RecipeSearchScreen = () => {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearchRecipes = async () => {
        setLoading(true);
        setSearched(true);
        setRecipes([]); 
        try {
            const response = await axios.get(`${API_BASE_URL}/recipes/search`);
            setRecipes(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Could not find recipes. Is the backend running with a valid Spoonacular API key?';
            console.error('Error searching recipes:', error.response ? error.response.data : error.message);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const handleViewRecipe = (recipe) => {
        // Use the router to navigate and pass the recipe object as a parameter
        router.push({
            pathname: "/RecipeDetail",
            params: { recipe: JSON.stringify(recipe) } 
        });
    };

    const renderRecipeItem = ({ item }) => (
        <Card style={styles.card} onPress={() => handleViewRecipe(item)}>
            <Card.Cover source={{ uri: item.image || 'https://via.placeholder.com/150' }} />
            <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>Used Ingredients: {item.usedIngredientCount}</Paragraph>
                <Paragraph style={styles.missingIngredients}>Missing Ingredients: {item.missedIngredientCount}</Paragraph>
            </Card.Content>
        </Card>
    );

    return (
        // The Appbar.Header is now correctly removed from this file.
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={handleSearchRecipes}
                loading={loading}
                disabled={loading}
                style={styles.searchButton}
            >
                Search Recipes with My Ingredients
            </Button>

            {loading && (
                <View style={styles.centered}>
                    <ActivityIndicator animating={true} size="large" />
                    <Text>Searching for recipes...</Text>
                </View>
            )}

            {!loading && searched && recipes.length === 0 && (
                <View style={styles.centered}>
                    <Text>No recipes found. Try adding more ingredients!</Text>
                </View>
            )}

            {!loading && recipes.length > 0 && (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderRecipeItem}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    searchButton: { marginBottom: 20 },
    card: { marginBottom: 15, borderRadius: 8, overflow: 'hidden' },
    missingIngredients: { color: '#d32f2f', fontSize: 12 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    listContent: { paddingBottom: 20 }
});

export default RecipeSearchScreen;