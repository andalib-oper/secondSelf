import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Activities from '../src/mainTabs/Activities';
import Feather from 'react-native-vector-icons/Feather'
import Feed from '../src/mainTabs/Feed';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontSize: 12,
          height: 20,
          fontWeight: '500',
        },
        tabBarItemStyle: {
          padding: 4,
        },
        tabBarStyle: {
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Feeds"
        component={Feed}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="dynamic-feed" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Activities" component={Activities} 
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="activity" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigation;
