import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ScreensProvider } from './src/screens/ScreenContext';
import 'react-native-gesture-handler';

import Account from './src/screens/Account';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/HomeScreen';
import TabsGame from './src/screens/TabsGame';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ScreensProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="TabsGame" component={TabsGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </ScreensProvider>
  );
}
