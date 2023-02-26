import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from '../src/mainTabs/Activities';
import Feed from '../src/mainTabs/Feed';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feeds" component={Feed} />
      <Tab.Screen name="Activities" component={Activities} />
    </Tab.Navigator>
  );
}

export default MainNavigation;