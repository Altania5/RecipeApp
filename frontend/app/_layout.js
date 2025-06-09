import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // The PaperProvider is now wrapping your whole app
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'My Ingredients' }}
        />
        <Stack.Screen
          name="AddIngredient"
          options={{ title: 'Add Ingredient' }}
        />
        <Stack.Screen
          name="RecipeSearch"
          options={{ title: 'Find Recipes' }}
        />
        <Stack.Screen
          name="RecipeDetail"
          options={{ title: 'Recipe Details' }} // This can be customized later
        />
      </Stack>
    </PaperProvider>
  );
}