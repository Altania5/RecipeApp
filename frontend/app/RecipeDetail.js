// RecipeApp/frontend/screens/RecipeDetailScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Title, Paragraph, Text } from 'react-native-paper';

const RecipeDetailScreen = ({ route, navigation }) => {
    const { recipe } = route.params;

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={recipe.title} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: recipe.image || 'https://via.placeholder.com/150' }} />
                    <Card.Content>
                        <Title style={styles.title}>{recipe.title}</Title>
                        <Paragraph>
                            <Text style={styles.bold}>Used Ingredients ({recipe.usedIngredientCount}):</Text>
                            {recipe.usedIngredients && recipe.usedIngredients.length > 0
                                ? recipe.usedIngredients.map(ing => ing.original).join(', ')
                                : 'None listed explicitly in Spoonacular response.'}
                        </Paragraph>
                        <Paragraph style={styles.missingText}>
                            <Text style={styles.bold}>Missing Ingredients ({recipe.missedIngredientCount}):</Text>
                            {recipe.missedIngredients && recipe.missedIngredients.length > 0
                                ? recipe.missedIngredients.map(ing => ing.original).join(', ')
                                : 'None'}
                        </Paragraph>
                        {/* NOTE: Spoonacular's findByIngredients does NOT return full instructions by default.
                            You'd need another API call (e.g., /recipes/{id}/information) for that.
                            This is just a placeholder. */}
                        <Paragraph style={styles.instructions}>
                            <Text style={styles.bold}>Instructions (Summary):</Text>
                            {/* Placeholder, as full instructions aren't in this API call result */}
                            {"Full instructions require another API call or a different Spoonacular endpoint."}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 16,
        paddingBottom: 50, // Give some space at the bottom
    },
    card: {
        elevation: 4, // Shadow for Android
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24,
    },
    bold: {
        fontWeight: 'bold',
    },
    missingText: {
        color: 'red',
        marginTop: 10,
    },
    instructions: {
        marginTop: 20,
        lineHeight: 22,
    }
});

export default RecipeDetailScreen;