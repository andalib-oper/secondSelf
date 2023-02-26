import {StyleSheet, Text, View, Image, Dimensions,ScrollView} from 'react-native';
import React from 'react';
import ForgotPassword from '../../components/Login/ForgotPassword';

const ForgotPass = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        source={require('../../assets/Images/png/logo-no-background.png')}
        style={styles.image}
      />
      <View style={styles.loginView}>
        <ForgotPassword />
      </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPass;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: windowHeight / 3.2,
    width: windowWidth / 2,
    alignSelf: 'center',
    marginTop: '10%',
  },
  loginView: {
    alignSelf: 'center',
    margin: '5%',
  },
});
