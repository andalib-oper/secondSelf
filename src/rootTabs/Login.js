import {StyleSheet, Text, View, Image, Dimensions,ScrollView} from 'react-native';
import React from 'react';
import LoginRegCompo from '../../components/Login/LoginRegCompo';

const Login = ({route}) => {
  const {data}=route.params
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        source={require('../../assets/Images/png/logo-no-background.png')}
        style={styles.image}
      />
      <View style={styles.loginView}>
        <LoginRegCompo data={data}/>
      </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: windowHeight / 3.6,
    width: windowWidth / 2,
    alignSelf: 'center',
    marginTop: '10%',
  },
  loginView: {
    alignSelf: 'center',
    margin: '5%',
  },
});
