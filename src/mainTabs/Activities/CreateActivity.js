import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Modal,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useState,useCallback} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import LocationIQ from 'react-native-locationiq';
import { useFocusEffect } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createActivityByUserId} from '../../../redux/Activity/actions';
import { createGroupByUserId } from '../../../redux/Chat/actions';


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

const CreateActivity = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(new Date());
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [place, setPlace] = useState('');
  const [city, setCity] = useState('');
  let members = []
  members.push(authState.id)
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
    LocationIQ.reverse(lat, long)
    .then(json => {
      var address = json.address.city;
      setCity(address);
    })
    .catch(error => console.log(error));
  const onSubmit = () => {
    dispatch(
      createActivityByUserId(
        authState?.id,
        text,
        place,
        city,
        date,
        time.toLocaleTimeString(),
      ),
    );
    dispatch(createGroupByUserId(authState.id,text,place,members))
    setPlace('');
    setCity('')
    setText('');
    setDate(new Date());
    setTime(new Date());
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ScrollView>

      {/* date view */}
      <View>
        <Text style={styles.headerText}>Date of Activity</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setOpen(true)}>
          <Text style={styles.dateText}>
            {date.getDate() ? moment(date).format('YYYY-MM-DD') : 'Select date'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      {/* time view */}
      <View>
        <Text style={styles.headerText}>Time of Activity</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setOpenTime(true)}>
          <Text style={styles.dateText}>
            {time ? time.toLocaleTimeString() : 'Select date'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="time"
          open={openTime}
          date={time}
          onConfirm={time => {
            setOpenTime(false);
            setTime(time);
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
      </View>
      {/* location view */}
      <View>
        <Text style={styles.headerText}>Place</Text>
        <TextInput
          style={styles.input}
          value={place}
          onChangeText={text => setPlace(text)}
          keyboardType={'default'}
          placeholder="PLace You want to visit"
          placeholderTextColor={'grey'}
        />
      </View>
      <View>
        <Text style={styles.headerText}>City</Text>
        <TouchableOpacity
            style={[
              styles.input,
              {justifyContent: 'center'},
            ]}
            onPress={() => {getCurrentPosition()}}>
            {city !==''? (
              <Text style={styles.text}>{city}</Text>
             
            ) : (
              <Text style={styles.text}>Click here to get current location</Text>
            )}
          </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerText}>Description</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          value={text}
          onChangeText={text => setText(text)}
          multiline={true}
          textAlignVertical={'top'}
          keyboardType={'default'}
          placeholder="Description of your journey"
          placeholderTextColor={'grey'}
        />
      </View>
      {/* create button */}
      <TouchableOpacity
        onPress={() => {
          onSubmit(),
            navigation.navigate('ActivitiesStack', {screen: 'Activities'});
        }}
        style={styles.createActivityButton}>
        <Text style={styles.createActivityText}>Create Activity</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateActivity;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // justifyContent:'center'
  },
  headerText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '5%',
  },
  dateButton: {
    marginLeft: '5%',
    marginTop: '5%',
    width: windowWidth / 1.1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  dateText: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
  },
  timeView: {
    flexDirection: 'row',
  },
  timeButton: {
    marginLeft: '5%',
    marginTop: '5%',
    width: windowWidth / 2.3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    marginTop: '4%',
    width: '90%',
    borderRadius: 10,
    color: 'grey',
    marginLeft: '5%',
    marginTop: '5%',
    backgroundColor: '#fff',
    padding: 10,
  },
  createActivityButton: {
    alignSelf: 'center',
    width: windowWidth / 1.2,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: '20%',
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
