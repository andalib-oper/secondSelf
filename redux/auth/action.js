import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  REGISTER_REQ,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGOUT,
} from './actionTypes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const req = () => ({
  type: REQ,
});

export const reqSuccess = (
  email,
  firstName,
  lastName,
  id,
  accessToken,
  role,

) => ({
  type: REQ_SUCCESS,
  email,
  firstName,
  lastName,
  id,
  accessToken,
  role
});

export const logout = () => ({
  type: LOGOUT,
});

export const reqFailure = (error) => ({
  type: REQ_FAILURE,
  error: error,
});

export const setNewAuthToken = (newAuthToken, newAuthTokenExpiry) => ({
  type: SET_NEW_AUTH_TOKEN,
  newAuthToken,
  newAuthTokenExpiry,
});

export const logUserIn = (loginData) => {
  return async (dispatch) => {
    dispatch(req());
    // console.log('login works');
    try {
      const response = await axios.post(`https://paradis-be-iam.herokuapp.com/api/auth/login`, {
        email: loginData.email,
        password: loginData.password,
      });
      console.log(response.data)
      if (response.headers.error) {
        dispatch(reqFailure('Invalid login credentials! Please try again.'));
        // console.log(response.headers.error);
      } else if (response) {
        // console.log('saving to async storage');
        console.log('COMPLETE RESPONSE DATA:', response.data)
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
        if(response.data.user.role == 'Store Manager','IT','ROLE_MEMBER'){
          const userData = JSON.stringify({
            email: response.data.user.email,
            id: response.data.user._id,
            accessToken: response.data.AccessToken,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            role: response.data.user.role,
          });
          await AsyncStorage.setItem('paradiseAuthToken', userData);
          console.log('Saved data to async storage!', userData);
          dispatch(
            reqSuccess(
              response.data.user.email,
              response.data.user.firstName,
              response.data.user.lastName,
              response.data.user._id,
              response.data.AccessToken,
              response.data.user.role
              ),
              );
              console.log(response.data.AccessToken)
        }else{
          dispatch(
            reqFailure(
              "You Are Not Authorized"
            ),
          );
        }
      } else {
        dispatch(
          reqFailure(
            "Something's not right! Please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log(err.message);
      if (err.message.includes('401')) {
        dispatch(reqFailure('Invalid credentials!'));
      } else {
        console.log(err.response.data.error)
        Alert.alert(err.response.data.error)
        dispatch(reqFailure(err.response.data.error));
      }
    }
  };
};

export const tokenRetriever = () => {
  console.log('login works567');
  return async (dispatch) => {
    console.log('login works123');
    dispatch(req());
    try {
      const userData = await AsyncStorage.getItem('paradiseAuthToken');
      const loggedData = userData != null ? JSON.parse(userData) : null;
      console.log('login works 2', userData);
      console.log('login works', loggedData);
      if (loggedData != null) {
        dispatch(
          reqSuccess(
            loggedData.email,
            loggedData.firstName,
            loggedData.lastName,
            loggedData.id,
            loggedData.accessToken,
            loggedData.role
          )
        );
      } else {
        //? LOGGING USER OUT.
        console.log('token retriever error 1: ');

        dispatch(logout());
        dispatch(reqFailure(''));
      }
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('token retriever error: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      dispatch(logUserOut());
      dispatch(reqFailure(''));
    }
  };
};

export const regUserUp = (regData) => {
  return async (dispatch) => {
    dispatch(req());
    // console.log('login works');
    try {
      const response = await axios.post(`https://paradis-be-iam.herokuapp.com/api/auth/register`, {
        email: regData.email,
        firstName: regData.firstName,
        lastName: regData.lastName,
        password: regData.password
      });
      console.log(response.data)
      if (response.headers.error) {
        dispatch(reqFailure('Invalid login credentials! Please try again.'));
        // console.log(response.headers.error);
      } else if (response) {
        // console.log('saving to async storage');
        console.log('COMPLETE RESPONSE DATA:', response.data)
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
        if(response.data.user.role == 'Store Manager','IT','ROLE_MEMBER'){
          const userData = JSON.stringify({
            email: response.data.user.email,
            id: response.data.user._id,
            accessToken: response.data.AccessToken,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            role: response.data.user.role,
          });
          await AsyncStorage.setItem('paradiseAuthToken', userData);
          console.log('Saved data to async storage!', userData);
          dispatch(
            reqSuccess(
              response.data.user.email,
              response.data.user.firstName,
              response.data.user.lastName,
              response.data.user._id,
              response.data.AccessToken,
              response.data.user.role
              ),
              );
              console.log(response.data.AccessToken)
        }else{
          dispatch(
            reqFailure(
              "You Are Not Authorized"
            ),
          );
        }
      } else {
        dispatch(
          reqFailure(
            "Something's not right! Please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log(err.message);
      if (err.message.includes('401')) {
        dispatch(reqFailure('Invalid credentials!'));
      } else {
        console.log(err.mesage)
        dispatch(reqFailure(err.message));
      }
    }
  };
};


export const logUserOut = () => {
  console.log('logging out');
  return async (dispatch) => {
    dispatch(req());
    try {
      await AsyncStorage.removeItem('paradiseAuthToken');
      // dispatch(reqSuccess('', ''));
      dispatch(logout());
      console.log('Async Storage emptied!');
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('unable to logout: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      dispatch(reqFailure(err.message));
    }
  };
};