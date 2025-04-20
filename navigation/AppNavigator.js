import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BeveragesScreen from '../screens/BeveragesScreen';
import FilterScreen from '../screens/FilterScreen'; // Thêm FilterScreen
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: '' }} />
  </Stack.Navigator>
);

const ExploreStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Explore" component={ExploreScreen} options={{ title: 'Find Products' }} />
    <Stack.Screen name="Beverages" component={BeveragesScreen} options={{ title: 'Beverages' }} />
    <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ title: 'Filters' }} /> 
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Shop') iconName = 'home';
          else if (route.name === 'Explore') iconName = 'compass';
          else if (route.name === 'Cart') iconName = 'cart';
          else if (route.name === 'Favourite') iconName = 'heart';
          else if (route.name === 'Account') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeStack} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Cart" component={() => null} />
      <Tab.Screen name="Favourite" component={() => null} />
      <Tab.Screen name="Account" component={() => null} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;