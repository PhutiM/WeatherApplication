import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './src/components/screens/LandingScreen';
import WeatherScreen from './src/components/screens/WeatherScreen';
import Favourites from './src/components/screens/Favourites';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LandingScreen"
          component={LandingScreen}
        />
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
        />
        <Stack.Screen
          name="Favourites"
          component={Favourites}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
