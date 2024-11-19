import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../screens/categoriesScreen/categoriesScreen';
import SettingsScreen from '../screens/settingsScreen/settingsScreen';
import BudgetScreen from '../screens/budgetScreen/budgetScreen';
import Budget from '../assets/pictures/budget.svg';
import SetUp from '../assets/pictures/setUp.svg';
import Ctgrs from '../assets/pictures/categories.svg';




const Tab = createBottomTabNavigator();


const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Бюджет" 
        component={BudgetScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Budget/>
          ),
        }}
      />
      <Tab.Screen 
        name="Категории" 
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ctgrs/>
          ),
        }}
      />
      <Tab.Screen 
        name="Настройки" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <SetUp/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
