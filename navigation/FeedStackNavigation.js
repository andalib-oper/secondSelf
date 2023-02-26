import React,{useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Feed from '../src/mainTabs/Feed/Feed';
import Stories from '../src/mainTabs/Feed/Stories';

const Stack = createStackNavigator();

const tabHiddenRoutes = ["Stories"];

const FeedStackNavigation = ({navigation,route}) => {
  useLayoutEffect(() => {
    // const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Stories"
        component={Stories}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNavigation;
