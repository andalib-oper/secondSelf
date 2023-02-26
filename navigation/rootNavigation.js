import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../src/rootTabs/Splash';
import MainNavigation from './mainNavigation';
import Login from '../src/rootTabs/Login';
import ForgotPass from '../src/rootTabs/ForgotPass';

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
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="forgotPass"
        component={ForgotPass}
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
