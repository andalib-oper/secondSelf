import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';

const Splash = ({navigation}) => {
  // useEffect(() => {
  //  setTimeout(()=>{
  //   navigation.navigate('FeedStack')
  //  },30000)
  // },[]);
  return (
    <View style={styles.container}>
      <Image
      source={require('../../assets/Images/png/logo-no-background.png')}
      style={styles.image}
      />
    </View>
  );
};

export default Splash;

const windowWidth= Dimensions.get('window').width
const windowHeight =Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
  image:{
    height:windowHeight/3.2,
    width:windowWidth/2,
    alignSelf: 'center'
  }
});
