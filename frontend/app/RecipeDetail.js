import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

const RecipeDetailScreen = () => {
    const params = useLocalSearchParams();
    // When data is passed via router, it's a string. We need to parse it back into an object.
    const recipe = params.recipe ? JSON.parse(params.recipe) : null;

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>No recipe data found.</Text>
            </View>
        );
    }

    return (
        // The Appbar.Header is also removed here.
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: recipe.image || 'https://via.placeholder.com/150' }} />
                <Card.Content>
                    <Title style={styles.title}>{recipe.title}</Title>
                    <Paragraph>
                        <Text style={styles.bold}>Used Ingredients ({recipe.usedIngredientCount}):</Text>
                        {' '}
                        {recipe.usedIngredients?.map(ing => ing.original).join(', ') || 'None'}
                    </Paragraph>
                    <Paragraph style={styles.missingText}>
                        <Text style={styles.bold}>Missing Ingredients ({recipe.missedIngredientCount}):</Text>
                        {' '}
                        {recipe.missedIngredients?.map(ing => ing.original).join(', ') || 'None'}
                    </Paragraph>
                    <Paragraph style={styles.instructions}>
                        <Text style={styles.bold}>Instructions:</Text>
                        {/* This part will be blank for now. See "Next Steps" below. */}
                        {" Full instructions require another API call. This is the next feature to build!"}
                    </Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollViewContent: { padding: 16, paddingBottom: 50 },
    card: { elevation: 4 },
    title: { marginTop: 10, marginBottom: 10, fontSize: 24 },
    bold: { fontWeight: 'bold' },
    missingText: { color: 'red', marginTop: 10 },
    instructions: { marginTop: 20, lineHeight: 22 }
});

export default RecipeDetailScreen;