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
import {useDispatch, useSelector} from 'react-redux';
import {
  editProfileDetails,
  newCoverPicture,
  newProfilePicture,
} from '../../../redux/Profile/actions';
import {uploadDoc} from '../../../redux/auth/action';

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
  const profileState = useSelector(state => state.profileState);
  const authState = useSelector(state => state.authState);
  const [res, setRes] = useState(profileState.profileDetails);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [Location, setLocation] = useState('');
  const [interest, setInterest] = useState([]);
  const [links, setLinks] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [profilePicImages, setProfilePicImages] = useState('');
  const [coverPic, setCoverPic] = useState('');
  const [coverPicImages, setcoverPicImage] = useState('');
  const [fileName, setFileName] = useState('');
  const [images, setImage] = useState('');
  const dispatch = useDispatch();
  LocationIQ.init('pk.9258ab5f6e3604f3f0a08054a0b92c48');
  const launchLibrary = profile => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      if (profile=='profile') {
        setProfilePic(image.path);
        setProfilePicImages(image);
        dispatch(newProfilePicture(image, authState.id));
      } else if (profile=='cover') {
        setCoverPic(image.path);
        setcoverPicImage(image);
        dispatch(newCoverPicture(image, authState.id));
      } else if(profile=='doc') {
        setFileName(image?.path?.slice(-20));
        setImage(image);
        dispatch(uploadDoc(image, authState.id));
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
  const handleChangeEdit = (name, inputValue) => {
    setRes({...res, [name]: inputValue});
  };
  const onSubmit = () => {
    dispatch(
      editProfileDetails(
        authState?.id,
        res?.name,
        res?.bio,
        res?.phoneNo,
        // Location?Location:res?.location,
        res?.city==undefined?Location.toLowerCase():res?.city,
        res?.gender,
        res?.maritalStatus,
        res?.occupation,
        // interest !== [] ? interest : res?.interest,
        res?.interest==[]?interest:res.interest,
        res?.links==[]?links:res.links,
        // links !== [] ? links : res?.links,
      ),
    );
  };
  LocationIQ.reverse(lat, long)
    .then(json => {
      var address = json.address.city;
      setLocation(address);
    })
    .catch(error => console.warn(error));

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.ImageView}>
          <ImageBackground
            style={styles.ImageBackground}
            blurRadius={3}
            source={{
              uri:
                profileState?.profileDetails?.coverPicture !== undefined
                  ? profileState?.profileDetails?.coverPicture
                  : 'https://i.imgflip.com/1gqvcu.jpg',
            }}>
            <ImageBackground
              borderRadius={100 / 1}
              source={{
                uri:
                  profileState?.profileDetails?.profilePicture !== undefined
                    ? profileState?.profileDetails?.profilePicture
                    : 'https://www.oseyo.co.uk/wp-content/uploads/2020/05/empty-profile-picture-png-2-2.png',
              }}
              style={styles.image}>
              <TouchableOpacity
                onPress={() => {
                  launchLibrary('profile');
                }}
                style={styles.editProfilePic}>
                <AntDesign name="camera" size={24} color={'#fff'} />
              </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity
              onPress={() => {
                launchLibrary('cover');
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
            value={res?.name}
            onChangeText={e => handleChangeEdit('name', e)}
            keyboardType={'default'}
          />
        </View>
        {/*bio section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Bio</Text>
          <ProfileInput
            editable={true}
            style={[styles.input, {height: 80}]}
            value={res?.bio}
            onChangeText={e => handleChangeEdit('bio', e)}
            keyboardType={'default'}
          />
        </View>
        {/* email section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>E-mail</Text>
          <ProfileInput
            editable={false}
            style={styles.input}
            value={res?.email}
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
            value={res?.phoneNo}
            onChangeText={e => handleChangeEdit('phoneNo', e)}
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
              {Location}
            </Text>
          </TouchableOpacity>
        </View>
        {/* GENDER section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Gender</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={res?.gender}
            onChangeText={e => handleChangeEdit('gender', e)}
            keyboardType={'default'}
          />
        </View>
        {/* Marital section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Marital Status</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={res?.maritalStatus}
            onChangeText={e => handleChangeEdit('maritalStatus', e)}
            keyboardType={'default'}
          />
        </View>
        {/* Occupation section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Occupation</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={res?.occupation}
            onChangeText={e => handleChangeEdit('occupation', e)}
            keyboardType={'default'}
          />
        </View>
        {/* Interests Section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Interests</Text>
          <ProfileInput
            editable={true}
            style={styles.input}
            value={res?.interest==[]?interest.toString():res?.interest.toString()}
            onChangeText={e => handleChangeEdit('interest',e.split(','))}
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
            onChangeText={e => handleChangeEdit('links',e.split(','))}
            keyboardType={'default'}
          />
        </View>
        {/* upload document section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Upload Id Proof</Text>
          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => launchLibrary('doc')}>
            <Text style={styles.locationText}>
              {fileName === '' ? 'Upload Id Proof' : fileName}
              {/* doc */}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Update Button  */}
        <TouchableOpacity
          onPress={() => {
            onSubmit();
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
    marginBottom: '5%',
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
