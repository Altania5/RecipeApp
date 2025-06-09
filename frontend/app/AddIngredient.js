// frontend/app/AddIngredient.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useRouter } from 'expo-router';

// Make sure this IP is correct for your local network
const API_BASE_URL = 'http://45.62.0.139:5000/api'; 

const AddIngredientScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveIngredient = async () => {
        if (!name.trim() || !quantity.trim()) {
            Alert.alert('Missing Fields', 'Please enter ingredient name and quantity.');
            return;
        }
        if (isNaN(quantity) || parseFloat(quantity) <= 0) {
            Alert.alert('Invalid Quantity', 'Please enter a valid positive number for quantity.');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/ingredients`, {
                name: name.trim(),
                quantity: parseFloat(quantity),
                unit: unit.trim()
            });
            Alert.alert('Success', 'Ingredient added successfully!');
            router.back(); // Use router to go back to the previous screen
        } catch (error) {
            console.error('Error adding ingredient:', error);
            Alert.alert('Error', 'Could not add ingredient.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // The <Appbar.Header> is removed from here. The layout file handles it.
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    label="Ingredient Name"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Unit (e.g., grams, cups, pieces)"
                    value={unit}
                    onChangeText={setUnit}
                    mode="outlined"
                    style={styles.input}
                />
                <Button
                    mode="contained"
                    onPress={handleSaveIngredient}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                >
                    Save Ingredient
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
});

export default AddIngredientScreen;