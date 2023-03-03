import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Image,StyleSheet,TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather'
import FeedStackNavigation from './FeedStackNavigation';
import ActivityStackNavigation from './ActivityStackNavigation';
import ChatStackNavigation from './ChatStackNavigation';
import ProfileStackNavigation from './ProfileStackNavigation';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#000',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarItemStyle: {
          backgroundColor: '#000'
        },
      }}>
      <Tab.Screen
        name="FeedsStack"
        component={FeedStackNavigation}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="dynamic-feed" color={color} size={24}/>
          ),
        }}
      />
      <Tab.Screen name="ActivitiesStack" component={ActivityStackNavigation} 
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({color}) => (
            <Feather name="activity" color={color} size={24} />
          ),
        }}
      />
        <Tab.Screen name="ChatStack" component={ChatStackNavigation} 
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color}) => (
            <AntDesign name="wechat" color={color} size={24} />
          ),
        }}
      />
        <Tab.Screen name="ProfileStack" component={ProfileStackNavigation} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <AntDesign name="profile" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigation;


const styles = StyleSheet.create({
  image: {
    height:40,
    width:40,
    margin:10
  },
  addButton:{
    marginRight: '5%'
  }
})
