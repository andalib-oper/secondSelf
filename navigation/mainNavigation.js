import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Image,StyleSheet,TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Activities from '../src/mainTabs/Activities/Activities';
import Feather from 'react-native-vector-icons/Feather'
import Chat from '../src/mainTabs/Chat';
import Profile from '../src/mainTabs/Profile';
import FeedStackNavigation from './FeedStackNavigation';

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
        name="Feeds"
        component={FeedStackNavigation}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="dynamic-feed" color={color} size={24}/>
          ),
        }}
      />
      <Tab.Screen name="Activities" component={Activities} 
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="activity" color={color} size={24} />
          ),
        }}
      />
        <Tab.Screen name="Chat" component={Chat} 
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name="wechat" color={color} size={24} />
          ),
        }}
      />
        <Tab.Screen name="Profile" component={Profile} 
        options={{
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
