import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../src/rootTabs/Splash';
import MainNavigation from './mainNavigation';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FeedStack"
        component={MainNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
