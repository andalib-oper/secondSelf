import React,{useLayoutEffect} from 'react';
import { View,Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Chat from '../src/mainTabs/Chat/Chat';
import ChatDetails from '../src/mainTabs/Chat/ChatDetails';

const Stack = createStackNavigator();

const tabHiddenRoutes = ["ChatDetails"];

const ChatStackNavigation = ({navigation,route}) => {
  useLayoutEffect(() => {
    // const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ChatDetails"
        component={ChatDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigation;
