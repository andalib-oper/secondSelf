import {StyleSheet, Text, View, Dimensions, Image,ImageBackground,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import React from 'react';
import FeedsData from '../../../assets/MockData/FeedsData';
import FeedsFlatlist from '../../../components/Home/FeedsFlatlist';
import StackHeader from '../../../components/StackHeader';
import { useNavigation } from '@react-navigation/native';
import ProfileInput from '../../../components/Profile/ProfileInput';
import { useDispatch } from 'react-redux';
import { logUserOut } from '../../../redux/auth/action';

const Profile = () => {
  const navigation=useNavigation()
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <StackHeader headerName="Profile" rightIcon={false} />
      <ScrollView>
      <View style={styles.ImageView}>
        <ImageBackground style={styles.ImageBackground}
        blurRadius={3}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg',
        }}
        >
        <Image
          source={{
            uri: 'https://assets.telegraphindia.com/telegraph/2021/Jun/1622577021_02metmall_4col.jpg',
          }}
          style={styles.image}
        />
        </ImageBackground>
      </View>
      <View style={styles.profileView}>
        <Text style={styles.profileHeader}>Profile Details</Text>
        <Text style={styles.editText} onPress={()=>navigation.navigate('EditProfile')}>Edit</Text>
      </View>
      {/* profile name */}
      <View style={styles.profileSection}>
        <Text style={styles.headerText}>Name</Text>
        <ProfileInput
        editable={false}
        style={styles.input}
        value={'Andalib Quraishi'}
        />
      </View>
      {/* email section */}
      <View style={styles.profileSectionRest}>
        <Text style={styles.headerText}>E-mail</Text>
        <ProfileInput
        editable={false}
        style={styles.input}
        value={'andalibquraishi1416@gmail.com'}
        />
      </View>
      {/* phone number section */}
      <View style={styles.profileSectionRest}>
        <Text style={styles.headerText}>Phone Number</Text>
        <ProfileInput
        editable={false}
        style={styles.input}
        value={'+91 9748125653'}
        />
      </View>
      {/* location section */}
      <View style={styles.profileSectionRest}>
        <Text style={styles.headerText}>Location</Text>
        <ProfileInput
        editable={false}
        style={styles.input}
        value={'Kolkata'}
        />
      </View>
       {/* GENDER section */}
       <View style={styles.profileSectionRest}>
        <Text style={styles.headerText}>Gender</Text>
        <ProfileInput
        editable={false}
        style={styles.input}
        value={'Female'}
        />
      </View>
{/* LOGOUT BUTTON */}
      <TouchableOpacity
          onPress={() => {
           dispatch(logUserOut())
          }}
          style={styles.createActivityButton}>
          <Text style={styles.createActivityText}>Logout</Text>
        </TouchableOpacity>
      {/* Activities section */}
      <View style={styles.profileView}>
        <Text style={styles.profileHeader}>Your Activies</Text>
      </View>
        <View style={styles.feedView}>
        <FlatList
          style={styles.flatlist}
          data={FeedsData}
          renderItem={({item}) => <FeedsFlatlist data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

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
  ImageBackground:{
    width: windowWidth / 1,
    height: windowHeight / 3,
    justifyContent:'center'
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  profileView:{
    marginTop:'2%',
    marginLeft:'3%',
    flexDirection:'row',
    alignSelf:'flex-start',
    padding:5
  },
  profileHeader:{
    width:'84%',
    fontSize:20,
    padding:10,
    fontWeight:'bold',
    color:'#fff'
  },
  editText:{
    fontSize:14,
    alignSelf:'center',
    padding:10,
    fontWeight:'bold',
    color:'#fff'
  },
  profileSection:{
    marginTop:'3%'
  },
  profileSectionRest:{
    marginTop:'3%'
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
  headerText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
    paddingHorizontal:10,
    marginLeft:'4%'
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
  createActivityButton: {
    alignSelf: 'center',
    width: windowWidth / 1.5,
    padding: 5,
    backgroundColor: '#fff',
    marginTop: '10%',
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
