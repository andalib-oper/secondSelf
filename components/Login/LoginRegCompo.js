import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LoginInput from './LoginInput';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {logUserIn, uploadDoc} from '../../redux/auth/action';
import { regUserUp } from '../../redux/auth/action';
import {stateCleanup, blurFields, updateFields} from '../../redux/Login/action';
import {passwordRegex2} from '../../constants/phoneRegex';
import {useNavigation} from '@react-navigation/native';
import { emailRegex } from '../../constants/phoneRegex';
import { blurFieldsReg, stateCleanupReg,updateFieldsReg } from '../../redux/register/actions';

const LoginRegCompo = ({data}) => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const authState = useSelector((state)=>state.authState)
  const [pass, setPass] = useState('');
  const [login, setLogin] = useState(data);
  const [reg, setReg] = useState(false);
  const loginFormState = useSelector(state => state.loginFormState);
  const dispatch = useDispatch();
  const registerFormState = useSelector(state=> state.registerFormState)

  // register state work here
  useEffect(() => {
    dispatch(stateCleanupReg());
  }, [dispatch]);
  const onSubmitHandlerReg = () => {
    if (
      registerFormState.inputValidity.email ,
      registerFormState.inputValidity.name,
      registerFormState.inputValidity.phoneNo,
      registerFormState.inputValidity.password
    ) {
      console.log('All fields validated');
      dispatch(regUserUp(registerFormState.inputValues))
      navigation.navigate('FeedStack')
    }
    else {
      Alert.alert("Please Input Fields Correctly")
    }
  };
  const blurListenerReg = (fieldId) => {
    dispatch(blurFieldsReg(fieldId));
  };

  const checkValidityReg = (val, fieldId) => {
    let isValid = true;
    if (fieldId === 'email' && !emailRegex.test(String(val).toLowerCase())) {
      // && !emailRegex.test(String(val).toLowerCase())
      isValid = false;
    }

    if (fieldId === 'password' && !passwordRegex2.test(String(val))) {
      isValid = false;
    }
    dispatch(updateFieldsReg(val, fieldId, isValid));
  };
  // login state work here
  useEffect(() => {
    dispatch(stateCleanup());
  }, [dispatch]);
  const onSubmitHandler = async() => {
    if (
      loginFormState.inputValidity.email &&
      loginFormState.inputValidity.password
    ) {
      console.log('All fields validated');
      await dispatch(logUserIn(loginFormState.inputValues));
      navigation.navigate('FeedStack')
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
      isValid = true;
    }
    
    if (fieldId === 'password' && !passwordRegex2.test(String(val))) {
      isValid = true;
    }
    dispatch(updateFields(val, fieldId, isValid));
  };
  return (
    <View style={styles.container}>
        <OrientationLoadingOverlay
          visible={authState.loading}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          />
    {reg ? (
      <View style={styles.regView}>
        <LoginInput
          placeholder={'Enter Name'}
          placeholderTextColor="#c4c4c4"
          editable={true}
          keyboardType={'default'}
          style={styles.input}
          value={registerFormState.inputValues.name}
          inputIsValid={registerFormState.inputValidity.name}
          inputIsTouched={registerFormState.isTouched.name}
          onChangeText={val => checkValidityReg(val, 'name')}
          onBlur={() => {
            blurListenerReg('name');
          }}
        />
        <LoginInput
          placeholder={'Enter Email'}
          placeholderTextColor="#c4c4c4"
          editable={true}
          keyboardType={'default'}
          style={styles.input}
          value={registerFormState.inputValues.email}
          inputIsValid={registerFormState.inputValidity.email}
          inputIsTouched={registerFormState.isTouched.email}
          onChangeText={val => checkValidityReg(val, 'email')}
          onBlur={() => {
            blurListenerReg('email');
          }}
        />
        <LoginInput
          placeholder={'Enter Phone Number'}
          placeholderTextColor="#c4c4c4"
          editable={true}
          style={styles.input}
          keyboardType={'numeric'}
          value={registerFormState.inputValues.phoneNo}
          inputIsValid={registerFormState.inputValidity.phoneNo}
          inputIsTouched={registerFormState.isTouched.phoneNo}
          onChangeText={val => checkValidityReg(val, 'phoneNo')}
          onBlur={() => {
            blurListenerReg('phoneNo');
          }}
        />
        <LoginInput
          placeholder={'Enter Password'}
          placeholderTextColor="#c4c4c4"
          editable={true}
          style={styles.input}
          keyboardType={'numeric'}
          visible={true}
          secureTextEntry={!passwordVisible}
          visibleStyle={styles.visibleStyle}
          name={passwordVisible ? 'eye' : 'eyeo'}
          onPress={() => setPasswordVisible(!passwordVisible)}
          value={registerFormState.inputValues.password}
          inputIsValid={registerFormState.inputValidity.password}
          inputIsTouched={registerFormState.isTouched.password}
          onChangeText={val => checkValidityReg(val, 'password')}
          onBlur={() => {
            blurListenerReg('password');
          }}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            setReg(false),onSubmitHandlerReg()
          }}>
          <Text style={styles.loginButtonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomSignUp}
          onPress={() => {
            setReg(false), setLogin(true), setPass('');
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
          keyboardType={'default'}
          value={loginFormState.inputValues.email}
          inputIsValid={loginFormState.inputValidity.email}
          inputIsTouched={loginFormState.isTouched.email}
          style={styles.input}
          onChangeText={val => checkValidity(val, 'email')}
          onBlur={() => {
            blurListener('email');
          }}
        />
        <LoginInput
          placeholder={'Enter Password'}
          placeholderTextColor="#c4c4c4"
          editable={true}
          style={styles.input}
          keyboardType={'numeric'}
          visible={true}
          secureTextEntry={!passwordVisible}
          visibleStyle={styles.visibleStyle}
          name={passwordVisible ? 'eye' : 'eyeo'}
          onPress={() => setPasswordVisible(!passwordVisible)}
          value={loginFormState.inputValues.password}
          inputIsValid={loginFormState.inputValidity.password}
          inputIsTouched={loginFormState.isTouched.password}
          onChangeText={val => checkValidity(val, 'password')}
          onBlur={() => {
            blurListener('password');
          }}
        />
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate('forgotPass');
          }}>
          <Text style={styles.forgotPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => onSubmitHandler()}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomSignUp}
          onPress={() => {
            setReg(true), setLogin(false), setPass('');
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
