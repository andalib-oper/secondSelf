import { StyleSheet, Text, View,Dimensions,TouchableOpacity,ScrollView,PermissionsAndroid} from 'react-native'
import React,{useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'
import Geolocation from 'react-native-geolocation-service';
import LocationIQ from 'react-native-locationiq';
import StackHeader from '../../../components/StackHeader';
import Ongoing from './Ongoing';
import Upcoming from './Upcoming';
import Completed from './Completed';
import { useSelector } from 'react-redux';


const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const Activities = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const activityState=useSelector((state)=>state.activityState)
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [Location, setLocation] = useState('');
  const status = ['All', 'Upcoming', 'Completed'];
  let upcoming = true
  LocationIQ.init('pk.9258ab5f6e3604f3f0a08054a0b92c48');
  const getCurrentPosition = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          pos => {
            setLat(JSON.stringify(pos.coords.latitude));
            setLong(JSON.stringify(pos.coords.longitude));
          },
          error =>
            console.log('GetCurrentPosition Error', JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      }
    });
  };
  useFocusEffect(
    useCallback(() => {
      getCurrentPosition()
    }, [])
    );
  LocationIQ.reverse(lat, long)
  .then(json => {
    var address = json.address.city;
    setLocation(address);
  })
  .catch(error => console.log(error));

  console.log("location activies", Location)
  return (
    <View style={styles.container}>
       <OrientationLoadingOverlay
        visible={activityState.loading}
        color="white"
        indicatorSize="large"
        messageFontSize={24}
      />
        <StackHeader
        headerName="Activities"
        rightIcon={true}
        rightIconStyle={true}
        filterName="plussquareo"
        filterSize={26}
        filterColor={'#fff'}
        filterNavigation={() => {navigation.navigate('CreateActivity')}}
      />
        <View style={styles.tabHead}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {status.length &&
          status.map((e, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.tabBox}
                activeOpacity={1}
                underlayColor=""
                onPress={() => {
                  setIndex(i);
                }}>
                <View
                  style={[
                    styles.tabButton,
                    index === i && styles.tabButtonActive,
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      index === i && styles.tabTextActive,
                    ]}>
                    {e}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <ScrollView>
        {index === 0 && <Ongoing city={Location}/>}
        {index === 1 && <Upcoming join={upcoming} city={Location}/>}
        {index === 2 && <Completed city={Location}/>}
        </ScrollView>
      </View>
    </View>
  )
}

export default Activities

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabHead: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding:10,
    width:windowWidth/1,
  },
  tabBox: {},
  tabButton: {
    borderRadius: 100/2,
    width: windowWidth/3.5,
    height: 40,
    padding:5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth:1,
    marginLeft: 10
  },
  tabButtonActive: {
    borderRadius: 100/2,
    width: windowWidth/3.5,
    height: 40,
    padding:5,
    borderColor: '#fff',
    borderWidth:1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  tabTextActive:{
    color:'#000'
  },
  tabText:{
    color:'#fff'
  },
  tabContainer:{
    flex:1,
    width:windowWidth/1
  },
})