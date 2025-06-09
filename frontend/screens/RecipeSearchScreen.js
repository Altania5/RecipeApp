// RecipeApp/frontend/screens/RecipeSearchScreen.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph, ActivityIndicator, Text } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Same as in IngredientListScreen

const RecipeSearchScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearchRecipes = async () => {
        setLoading(true);
        setSearched(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/recipes/search`);
            // Spoonacular's findByIngredients returns an array of recipes
            // each with 'id', 'title', 'image', 'usedIngredientCount', 'missedIngredientCount', etc.
            setRecipes(response.data);
        } catch (error) {
            console.error('Error searching recipes:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Could not find recipes. Check your backend and Spoonacular API key.');
        } finally {
            setLoading(false);
        }
    };

    const renderRecipeItem = ({ item }) => (
        <Card style={styles.card} onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
            <Card.Cover source={{ uri: item.image || 'https://via.placeholder.com/150' }} />
            <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>
                    Used: {item.usedIngredientCount}, Missing: {item.missedIngredientCount}
                </Paragraph>
                {item.missedIngredients && item.missedIngredients.length > 0 && (
                    <Paragraph style={styles.missingIngredients}>
                        Missing: {item.missedIngredients.map(ing => ing.name).join(', ')}
                    </Paragraph>
                )}
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Find Recipes" />
            </Appbar.Header>

            <View style={styles.content}>
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
                        <Text>No recipes found with your current ingredients.</Text>
                        <Text>Try adding more common ingredients!</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    searchButton: {
        marginBottom: 20,
    },
    card: {
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
    },
    missingIngredients: {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 12,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContent: {
        paddingBottom: 20, // Add some padding to the bottom of the list
    }
});

export default RecipeSearchScreen;