import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthScreens = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#FEAA16',
        inactiveTintColor: '#E6E0E9',
        style: {
          backgroundColor: '#211F26',
        },
      }}
    >
      <Tab.Screen 
        name="Login" 
        component={Login} 
        options={{ 
          headerShown: false, 
          tabBarActiveBackgroundColor: '#211F26',
          tabBarInactiveBackgroundColor: '#211F26',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-log-in" color={color} size={size} /> 
          )
        }}
      />
      <Tab.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ 
          headerShown: false, 
          tabBarActiveBackgroundColor: '#211F26',
          tabBarInactiveBackgroundColor: '#211F26',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-person-add" color={color} size={size} /> 
          )
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={AuthScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
