import {StyleSheet, Text, View, Dimensions, Image,ImageBackground} from 'react-native';
import React from 'react';
import StackHeader from '../../../components/StackHeader';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <StackHeader headerName="Profile" rightIcon={false} />
      <View style={styles.ImageView}>
        <ImageBackground style={styles.ImageBackground}
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
    marginLeft:'2%',
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
  }
});
