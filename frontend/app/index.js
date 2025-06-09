// frontend/app/index.js (formerly IngredientListScreen.js)
import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB, List, Text, Appbar, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router'; // <-- Import useRouter

const API_BASE_URL = 'http://192.168.1.123:5000/api'; // <-- IMPORTANT: Use your correct local IP

const IngredientListScreen = () => { // No more 'navigation' prop
    const router = useRouter(); // <-- Get the router object
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    // ... (keep fetchIngredients and handleDelete the same)

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
                            await axios.delete(`${API_BASE_URL}/ingredients/${id}`);
                            fetchIngredients();
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


    useFocusEffect(
        useCallback(() => {
            fetchIngredients();
        }, [])
    );
    
    // ... (keep the loading return block)
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
            {/* The Appbar is now handled by the layout, so we can remove it here */}
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
                            title={`${item.name} (${item.quantity} ${item.unit || ''})`}
                            description={`Added: ${new Date(item.createdAt).toLocaleDateString()}`}
                            left={props => <List.Icon {...props} icon="food-apple" />}
                            right={props => (
                                <List.Icon
                                    {...props}
                                    icon="delete"
                                    onPress={() => handleDelete(item._id)}
                                />
                            )}
                        />
                    )}
                />
            )}

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => router.push('/AddIngredient')} // <-- Use router.push
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