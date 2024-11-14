import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../screens/categoriesScreen/categoriesScreen';
import SetUpBudgetScreen from '../screens/setUpBudgetScreen/setUpBudgetScreen';
import BudgetScreen from '../screens/budgetScreen/budgetScreen';
import Budget from '../assets/budget.svg';
import SetUp from '../assets/setUp.svg';
import Ctgrs from '../assets/categories.svg';




const Tab = createBottomTabNavigator();


const TabNavigation = () => {
  return (
    <Tab.Navigator>
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
        name="Внести" 
        component={SetUpBudgetScreen} 
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
