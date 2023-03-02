import React,{useLayoutEffect} from 'react';
import { View,Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ActivityDetails from '../src/mainTabs/Activities/ActivityDetails';
import Activities from '../src/mainTabs/Activities/Activities';

const Stack = createStackNavigator();

const tabHiddenRoutes = ["ActivityDetails"];

const ActivityStackNavigation = ({navigation,route}) => {
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
        name="Activities"
        component={Activities}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ActivityDetails"
        component={ActivityDetails}
        options={{
          headerShown: true,
          headerTitle: 'Activity Details',
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

export default ActivityStackNavigation;
