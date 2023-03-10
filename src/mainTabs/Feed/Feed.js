import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  PermissionsAndroid
} from 'react-native';
import React,{useState,useEffect,useCallback} from 'react';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import LocationIQ from 'react-native-locationiq';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'
import StackHeader from '../../../components/StackHeader';
import FeedsFlatlist from '../../../components/Home/FeedsFlatlist';
import { useDispatch, useSelector } from 'react-redux';
import { getStories } from '../../../redux/Feeds/actions';
import { getPostByCity } from '../../../redux/Post/actions';

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

const Feed = () => {
  const authState = useSelector((state)=>state.authState)
  const feedState = useSelector((state)=>state.feedState)
  const postState = useSelector((state)=>state.postState)
  const navigation = useNavigation();
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [Location, setLocation] = useState('');
  const dispatch=useDispatch()
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
    dispatch(getStories(Location))
    dispatch(getPostByCity(Location))
  }, [Location])
  );
  LocationIQ.reverse(lat, long)
    .then(json => {
      var address = json.address.city;
      setLocation(address);
    })
    .catch(error => console.log(error));
    console.log("authid", authState.id)
  return (
    <View style={styles.container}>
       <OrientationLoadingOverlay
        visible={feedState.loading}
        color="white"
        indicatorSize="large"
        messageFontSize={24}
      />
      <StackHeader
        headerImage={true}
        headerName="Feeds"
        rightIcon={true}
        filterName="plussquareo"
        filterSize={26}
        filterColor={'#fff'}
        filterNavigation={() => {navigation.navigate('CreatePost')}}
      />
      <ScrollView>
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesText}>Stories</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={styles.storiesView}>
            {feedState?.stories?.map(i => {
              let arr=[]
              arr.push(i?.contentURL)
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Stories', {stories: arr,content:i})
                  }>
                  <ImageBackground
                    style={[styles.storyButton]
                    }>
                    <Image
                      source={{uri: arr[0]}}
                      style={styles.image}
                    />
                  </ImageBackground>
                  <Text style={styles.storyName}>{i?.placeName}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.feedView}>
        <FlatList
          style={styles.flatlist}
          data={postState.postCity}
          renderItem={({item}) => <FeedsFlatlist data={item} city={Location}/>}
          keyExtractor={item => item._id}
        />
      </View>
      </ScrollView>
    </View>
  );
};

export default Feed;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storiesContainer: {
    alignSelf: 'flex-start',
    height: windowHeight / 6,
    marginTop: '2%',
  },
  storiesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: '5%',
  },
  storiesView: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  storyButton: {
    borderColor: 'green',
    borderRadius: 100 / 2,
    borderWidth: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 8,
    marginRight: 5,
  },
  storyName: {
    alignSelf: 'center',
    marginTop: 5,
    color:'#fff'
  },
  feedView: {
    width: windowWidth / 1,
    alignSelf: 'center',
    padding: 5,
  },
  flatlist: {
    padding: 5,
    alignSelf: 'center',
    width: windowWidth / 1,
  },
});
