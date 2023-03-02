import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Modal,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Geolocation from 'react-native-geolocation-service';
import LocationIQ from 'react-native-locationiq';
import TimeRangePicker from 'react-native-range-timepicker';
import moment from 'moment';

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
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [Location, setLocation] = useState('');
  const onSelect = ({startTime, endTime}) => {
    setStart(startTime);
    setEnd(endTime);
    setVisible(false);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <View style={styles.container}>
        {/* date view */}
      <View>
        <Text style={styles.headerText}>Date of Activity</Text>
        <TouchableOpacity style={styles.dateButton} onPress={()=>setOpen(true)}>
          <Text style={styles.dateText}>{date.getDate()?moment(date).format('YYYY-MM-DD'):'Select date'}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode='date'
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
        <View style={styles.timeView}>
        <TouchableOpacity style={styles.timeButton} onPress={()=>setVisible(true)}>
          <Text style={styles.dateText}>{start?start:'Select Start Time'}</Text>
        </TouchableOpacity>
        <View style={styles.timeButton}>
          <Text style={styles.dateText}>{end?end:'Select End Time'}</Text>
        </View>
        <TimeRangePicker
              style={styles.timer}
              visible={visible}
              onClose={onClose}
              onSelect={onSelect}
            />
        </View>
      </View>
      {/* location view */}
      <View>
      <Text style={styles.headerText}>Location</Text>
       <TextInput
       style={styles.input}
       value={Location}
       onChangeText={(text)=>setLocation(text)}
       keyboardType={'default'}
       placeholder='PLace You want to visit'
       placeholderTextColor={'grey'}
       />
      </View>
      {/* create button */}
      <TouchableOpacity onPress={()=>{navigation.navigate('ActivitiesStack',{screen:'Activities'})}} style={styles.createActivityButton}>
        <Text style={styles.createActivityText}>Create Activity</Text>
      </TouchableOpacity>
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
    marginTop:'5%',
  },
  dateButton: {
    marginLeft: '5%',
    marginTop:'5%',
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
  timeView:{
    flexDirection:'row'
  },
  timeButton: {
    marginLeft: '5%',
    marginTop:'5%',
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
    marginTop:'5%',
    backgroundColor: '#fff',
    padding: 10,
  },
  createActivityButton:{
    alignSelf:'center',
    width:windowWidth/1.2,
    padding:10,
    backgroundColor:'#fff',
    marginTop:'20%',
    borderRadius:10,
  },
  createActivityText:{
fontSize:16,
padding:10,
alignSelf:'center',
color:'#000',
fontWeight:'bold'
  }
});
