// RecipeApp/frontend/App.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import IngredientListScreen from './screens/IngredientListScreen';
import AddIngredientScreen from './screens/AddIngredientScreen';
import RecipeSearchScreen from './screens/RecipeSearchScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen'; // Will be simple for now

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Ingredients">
          <Stack.Screen
            name="Ingredients"
            component={IngredientListScreen}
            options={{ title: 'My Ingredients' }}
          />
          <Stack.Screen
            name="AddIngredient"
            component={AddIngredientScreen}
            options={{ title: 'Add Ingredient' }}
          />
          <Stack.Screen
            name="RecipeSearch"
            component={RecipeSearchScreen}
            options={{ title: 'Find Recipes' }}
          />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={({ route }) => ({ title: route.params.recipe.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}