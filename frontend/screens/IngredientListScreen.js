// RecipeApp/frontend/screens/IngredientListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB, List, Text, Appbar, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

// Important: Replace with your backend's public IP or hostname (e.g., ngrok URL, Heroku URL)
// During development, if your backend is local, use your computer's IP address.
// On a real device, 'localhost' will refer to the device itself, not your computer.
// Example: const API_BASE_URL = 'http://192.168.1.XX:5000/api'; (Replace XX with your local IP)
// Or if deployed: const API_BASE_URL = 'https://your-app-name.herokuapp.com/api';
const API_BASE_URL = 'http://45.62.0.139:5000/api'; // For Android emulator to access host machine localhost
// If testing on a physical device, replace 10.0.2.2 with your computer's actual local IP address
// (e.g., 192.168.1.XX or 10.0.0.XX)

const IngredientListScreen = ({ navigation }) => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIngredients = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/ingredients`);
            setIngredients(response.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            Alert.alert('Error', 'Could not fetch ingredients. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Alert.alert(
            'Delete Ingredient',
            'Are you sure you want to delete this ingredient?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await axios.delete(`<span class="math-inline">\{API\_BASE\_URL\}/ingredients/</span>{id}`);
                            fetchIngredients(); // Re-fetch list after deletion
                        } catch (error) {
                            console.error('Error deleting ingredient:', error);
                            Alert.alert('Error', 'Could not delete ingredient.');
                        }
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    // Use useFocusEffect to refetch data when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchIngredients();
            return () => { /* optional cleanup */ };
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator animating={true} size="large" />
                <Text>Loading Ingredients...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="My Ingredients" />
                <Appbar.Action
                    icon="food-variant"
                    onPress={() => navigation.navigate('RecipeSearch')}
                />
            </Appbar.Header>

            {ingredients.length === 0 ? (
                <View style={styles.centered}>
                    <Text>No ingredients added yet!</Text>
                    <Text>Tap the `&apos;`+`&apos;` button to add some.</Text>
                </View>
            ) : (
                <FlatList
                    data={ingredients}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <List.Item
                            title={`<span class="math-inline">\{item\.name\} \(</span>{item.quantity} ${item.unit || ''})`}
                            description={`Added: ${new Date(item.createdAt).toLocaleDateString()}`}
                            left={props => <List.Icon {...props} icon="food-apple" />}
                            right={props => (
                                <List.Icon
                                    {...props}
                                    icon="delete"
                                    onPress={() => handleDelete(item._id)}
                                    color="red"
                                />
                            )}
                        />
                    )}
                />
            )}

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('AddIngredient')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default IngredientListScreen;