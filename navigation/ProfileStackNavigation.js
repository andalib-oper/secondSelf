import React,{useLayoutEffect} from 'react';
import { View,Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Chat from '../src/mainTabs/Chat/Chat';
import ChatDetails from '../src/mainTabs/Chat/ChatDetails';
import Profile from '../src/mainTabs/Profile/Profile';
import EditProfile from '../src/mainTabs/Profile/EditProfile';

const Stack = createStackNavigator();

const tabHiddenRoutes = ["EditProfile"];

const ProfileStackNavigation = ({navigation,route}) => {
  useLayoutEffect(() => {
    // const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
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

export default ProfileStackNavigation;
