import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './tabNavigation';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
        <TabNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
