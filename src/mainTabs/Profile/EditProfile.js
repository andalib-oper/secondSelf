import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import LocationIQ from 'react-native-locationiq';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import ProfileInput from '../../../components/Profile/ProfileInput';

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

const EditProfile = () => {
  const navigation = useNavigation();
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [Location, setLocation] = useState('');
  const [interest, setInterest] = useState(['carrom', 'cricket']);
  const [links, setLinks] = useState([
    'https://unsplash.com/',
    'www.w3school.com',
  ]);
  const [profilePic, setProfilePic] = useState('');
  const [profilePicImages, setProfilePicImages] = useState('');
  const [coverPic, setCoverPic] = useState('');
  const [coverPicImages, setcoverPicImage] = useState('');
  LocationIQ.init('pk.9258ab5f6e3604f3f0a08054a0b92c48');
  const launchLibrary = profile => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      if (profile) {
        setProfilePic(image.path);
        setProfilePicImages(image);
      } else {
        setCoverPic(image.path);
        setcoverPicImage(image);
      }
    });
  };
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
  LocationIQ.reverse(lat, long)
    .then(json => {
      var address = json.address.city;
      setLocation(address);
    })
    .catch(error => console.warn(error));

  console.log('pp', profilePic);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.ImageView}>
          <ImageBackground
            style={styles.ImageBackground}
            blurRadius={3}
            source={{
              uri:
                coverPic === ''
                  ? 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg'
                  : coverPic,
            }}>
            <ImageBackground
              borderRadius={100 / 1}
              source={{
                uri:
                  profilePic === ''
                    ? 'https://assets.telegraphindia.com/telegraph/2021/Jun/1622577021_02metmall_4col.jpg'
                    : profilePic,
              }}
              style={styles.image}>
              <TouchableOpacity
                onPress={() => {
                  launchLibrary(true);
                }}
                style={styles.editProfilePic}>
                <AntDesign name="camera" size={24} color={'#fff'} />
              </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity
              onPress={() => {
                launchLibrary(false);
              }}
              style={styles.editProfilePic}>
              <AntDesign name="camera" size={24} color={'#fff'} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.profileView}>
          <Text style={styles.profileHeader}>Profile Details</Text>
        </View>
        {/* profile name */}
        <View style={styles.profileSection}>
          <Text style={styles.headerText}>Name</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={'Andalib Quraishi'}
            onChangeText={() => console.log('first')}
            keyboardType={'default'}
          />
        </View>
        {/*bio section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Bio</Text>
          <ProfileInput
            editable={true}
            style={[styles.input, {height: 80}]}
            value={'Busy With my stuff bro'}
            onChangeText={() => console.log('first')}
            keyboardType={'numeric'}
          />
        </View>
        {/* email section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>E-mail</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={'andalibquraishi1416@gmail.com'}
            onChangeText={() => console.log('first')}
            keyboardType={'default'}
          />
        </View>
        {/* phone number section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Phone Number</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={'+91 9748125653'}
            onChangeText={() => console.log('first')}
            keyboardType={'numeric'}
          />
        </View>
        {/* location section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Location</Text>
          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => getCurrentPosition()}>
            <Text style={styles.locationText}>
              {Location === '' ? 'Kolkata' : Location}
            </Text>
          </TouchableOpacity>
        </View>
        {/* GENDER section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Gender</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={'Female'}
            onChangeText={() => console.log('first')}
            keyboardType={'default'}
          />
        </View>
        {/* Marital section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Marital Status</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={'Single'}
            onChangeText={() => console.log('first')}
            keyboardType={'default'}
          />
        </View>
        {/* Occupation section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Occupation</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={'React Native Developer'}
            onChangeText={() => console.log('first')}
            keyboardType={'default'}
          />
        </View>
        {/* Interests Section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Interests</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={interest.toString()}
            onChangeText={e => setInterest(e.split(','))}
            keyboardType={'default'}
          />
        </View>
        {/* Links Section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Links</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={links.toString()}
            onChangeText={e => setLinks(e.split(','))}
            keyboardType={'default'}
          />
        </View>
        {/* Update Button  */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.createActivityButton}>
          <Text style={styles.createActivityText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  ImageView: {
    width: windowWidth / 1,
    height: windowHeight / 3,
    paddingHorizontal: 1,
    justifyContent: 'center',
  },
  ImageBackground: {
    width: windowWidth / 1,
    height: windowHeight / 3,
    justifyContent: 'center',
  },
  editProfilePic: {
    position: 'absolute',
    right: 30,
    bottom: 5,
    alignSelf: 'center',
  },
  editCoverPic: {
    position: 'absolute',
    right: 30,
    bottom: 5,
    alignSelf: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  profileView: {
    marginTop: '2%',
    marginLeft: '3%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 5,
  },
  profileHeader: {
    width: '84%',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  editText: {
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    marginTop: '3%',
  },
  profileSectionRest: {
    marginTop: '3%',
  },
  input: {
    alignSelf: 'center',
    height: 40,
    width: windowWidth / 1.4,
    marginTop: '2%',
    marginLeft: 1,
    marginBottom: 10,
    color: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginLeft: '4%',
  },
  locationInput: {
    alignSelf: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: windowWidth / 1.1,
    marginTop: '2%',
    marginLeft: 1,
    marginBottom: 10,
  },
  locationText: {
    alignSelf: 'flex-start',
    marginLeft: '2%',
    paddingVertical: 10,
    marginBottom: '3%',
    color: '#fff',
    fontSize: 14,
  },
  createActivityButton: {
    alignSelf: 'center',
    width: windowWidth / 1.2,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: '20%',
    marginBottom:'5%',
    borderRadius: 10,
  },
  createActivityText: {
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});
