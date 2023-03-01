import React,{useLayoutEffect} from 'react';
import { View,Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Feed from '../src/mainTabs/Feed/Feed';
import Stories from '../src/mainTabs/Feed/Stories';
import Comments from '../src/mainTabs/Feed/Comments';
import CameraOptions from '../src/mainTabs/Feed/CameraOptions';

const Stack = createStackNavigator();

const tabHiddenRoutes = ["Stories","Comments","CameraOptions"];

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
       <Stack.Screen
        name="CameraOptions"
        component={CameraOptions}
        options={{
          headerShown: true,
          headerTitle: 'Upload Stories',
          headerStyle:{
            backgroundColor:'#000'
          },
          headerTitleStyle:{
            color:'#fff'
          },
          headerTintColor:'#fff'
        }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          headerShown: true,
          headerStyle:{
            backgroundColor:'#000'
          },
          headerTitleStyle:{
            color:'#fff'
          },
          headerTintColor:'#fff'
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNavigation;
