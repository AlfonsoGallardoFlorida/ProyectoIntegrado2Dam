import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Provider as PaperProvider
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Screen1 from './TapScreen';
import Screen2 from '../shops/ShopUpgrades';
import Screen3 from '../shops/Shop2';
import Screen4 from '../infoPlayer/Configuration';
import Screen5 from '../infoPlayer/Achievements';

const Tab = createBottomTabNavigator();

//This tab screen has the navigation to each screen of the game: 
//the main game screen, to both shops, to the configuration screen and to the achievements.
const TabsGame = () => {
  return (
    <PaperProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#211F26', 
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray', 
        }}>
        <Tab.Screen
          name="Main Page"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
          component={Screen1}
        />
        <Tab.Screen
          name="Shop1"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="earth" color={color} size={size} />
            ),
          }}
          component={Screen2}
        />
        <Tab.Screen
          name="Shop2"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="cow" color={color} size={size} />
            ),
          }}
          component={Screen3}
        />
        <Tab.Screen
          name="Config"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="tools" color={color} size={size} />
            ),
          }}
          component={Screen4}
        />
        <Tab.Screen
          name="Achievements"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="trophy" color={color} size={size} />
            ),
          }}
          component={Screen5}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
};

export default TabsGame;
