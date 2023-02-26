import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import LoginInput from './LoginInput';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {stateCleanup, blurFields, updateFields} from '../../redux/Login/action';
import {passwordRegex2} from '../../constants/phoneRegex';
import { useNavigation } from '@react-navigation/native';

const LoginRegCompo = () => {
  const navigation = useNavigation()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pass, setPass] = useState('');
  const [login, setLogin] = useState(true);
  const [reg, setReg] = useState(false);
  const [fileName, setFileName] = useState('');
  const [images, setImage] = useState('');
  const loginFormState = useSelector(state => state.loginFormState);
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  useEffect(() => {
    dispatch(stateCleanup());
  }, [dispatch]);
  const onSubmitHandler = () => {
    if (
      loginFormState.inputValidity.email &&
      loginFormState.inputValidity.password
    ) {
      console.log('All fields validated');
      // dispatch(logUserIn(loginFormState.inputValues));
    } else {
      Alert.alert('Please Input Fields Correctly');
    }
  };

  const blurListener = fieldId => {
    dispatch(blurFields(fieldId));
  };

  const checkValidity = (val, fieldId) => {
    let isValid = true;
    if (fieldId === 'email') {
      isValid = false;
    }

    if (fieldId === 'password' && !passwordRegex2.test(String(val))) {
      isValid = false;
    }
    dispatch(updateFields(val, fieldId, isValid));
  };
  const launchLibrary = () => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      console.log('img', image?.path?.slice(-23));
      setFileName(image?.path?.slice(-23));
      setImage(image);
    });
  };
  return (
    <View style={styles.container}>
      {reg ? (
        <View style={styles.regView}>
          <LoginInput
            placeholder={'Enter Name'}
            placeholderTextColor="#c4c4c4"
            editable={true}
            style={styles.input}
            onChangeText={() => console.log('first')}
            value={''}
            keyboardType={'default'}
          />
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
           placeholder={'Enter Password'}
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
            style={styles.uploadDocumentButton}
            onPress={() => launchLibrary()}>
            <Text
              style={
                fileName === ''
                  ? [styles.uploadDocument]
                  : [styles.uploadDocument, {color: '#fff'}]
              }>
              {fileName === '' ? 'Upload Document' : fileName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSignUp}
            onPress={() => {
              setReg(false), setLogin(true),setPass('');
            }}>
            <Text style={styles.bottomSignUpText}>
              Already Have an account ? Login
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {login ? (
        <View style={styles.loginView}>
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
            placeholder={'Enter Password'}
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
          <TouchableOpacity style={styles.forgotPassword} onPress={()=>{navigation.navigate('forgotPass')}}>
            <Text style={styles.forgotPasswordText}>Forget Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSignUp}
            onPress={() => {
              setReg(true), setLogin(false),setPass('');
            }}>
            <Text style={styles.bottomSignUpText}>New user sign up</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default LoginRegCompo;
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
  loginView: {},
  regView: {},
  uploadDocumentButton: {
    alignSelf: 'flex-start',
    height: 50,
    width: windowWidth / 1.23,
    marginTop: '7%',
    marginLeft: 10,
    marginBottom: 10,
    padding: 5,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  uploadDocument: {
    fontSize: 14,
    color: '#c4c4c4',
    padding: 5,
    marginLeft: '2%',
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: '3%',
    marginRight: '3%',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
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
  bottomSignUp: {
    marginTop: '3%',
    margin: '5%',
    width: windowWidth / 1.3,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  bottomSignUpText: {
    paddingHorizontal: 10,
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
