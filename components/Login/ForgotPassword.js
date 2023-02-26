import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LoginInput from './LoginInput';
import {useNavigation} from '@react-navigation/native';
import LoginRegCompo from './LoginRegCompo';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pass, setPass] = useState('');
  return (
    <View style={styles.container}>
      <LoginInput
        placeholder={'Enter Email'}
        placeholderTextColor="#c4c4c4"
        editable={true}
        style={styles.input}
        onChangeText={() => console.log('first')}
        value={''}
        keyboardType={'default'}
      />
      <LoginInput
        placeholder={'Enter New Password'}
        placeholderTextColor="#c4c4c4"
        editable={true}
        style={styles.input}
        onChangeText={e => setPass(e)}
        value={pass}
        keyboardType={'numeric'}
        visible={true}
        secureTextEntry={!passwordVisible}
        visibleStyle={styles.visibleStyle}
        name={passwordVisible ? 'eye' : 'eyeo'}
        onPress={() => setPasswordVisible(!passwordVisible)}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginButtonText}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        height: 'auto',
        alignSelf: 'center',
        width: windowWidth / 1.1,
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 20,
      },
  input: {
    alignSelf: 'center',
    height: 50,
    width: windowWidth / 1.4,
    marginTop: '4%',
    marginLeft: 10,
    marginBottom: 10,
    padding: 5,
    color: '#fff',
  },
  visibleStyle: {
    alignSelf: 'center',
    alignContent: 'center',
    height: 50,
    width: windowWidth / 1.3,
    marginTop: '5%',
    marginBottom: 10,
    paddingVertical: 15,
  },
  loginButton: {
    marginTop: '15%',
    margin: '5%',
    width: windowWidth / 1.3,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  loginButtonText: {
    padding: 10,
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
