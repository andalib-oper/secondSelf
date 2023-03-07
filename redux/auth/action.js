import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  REGISTER_REQ,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGOUT,
  UPLOAD_DOCUMENT,
} from './actionTypes';
import axios from 'axios';
import {BASE_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const req = () => ({
  type: REQ,
});

export const reqSuccess = (
  accessToken,
  email,
  id,
  name,
  phoneNo,
  maritalStatus,
  interest,
  links,
) => ({
  type: REQ_SUCCESS,
  accessToken,
  email,
  id,
  name,
  phoneNo,
  maritalStatus,
  interest,
  links,
});

export const doc = (data) => ({
  type: UPLOAD_DOCUMENT,
  data
});

export const logout = () => ({
  type: LOGOUT,
});

export const reqFailure = error => ({
  type: REQ_FAILURE,
  error: error,
});

export const setNewAuthToken = (newAuthToken, newAuthTokenExpiry) => ({
  type: SET_NEW_AUTH_TOKEN,
  newAuthToken,
  newAuthTokenExpiry,
});

export const logUserIn = (loginData) => {
  return async dispatch => {
    dispatch(req())
    try {
      const response = await axios.post( BASE_URL + `/api/auth/user/login`, {
        email: loginData.email,
        password: loginData.password,
      });
      if (response) {
        // console.log('COMPLETE RESPONSE DATA:', response.data);
        if (response) {
          const userData = JSON.stringify({
            email: response.data.user.email,
            id: response.data.user._id,
            accessToken: response.data.AccessToken,
            name: response.data.user.name,
            phoneNo: response.data.user.phoneNo,
            maritalStatus: response.data.user.maritalStatus,
            interest: response.data.user.interest,
            links: response.data.user.links,
          });
          await AsyncStorage.setItem('secondSelfAuthToken', userData);
          // console.log('Saved data to async storage!', userData);
          dispatch(
            reqSuccess(
              response.data.AccessToken,
              response.data.user.email,
              response.data.user._id,
              response.data.user.name,
              response.data.user.phoneNo,
              response.data.user.maritalStatus,
              response.data.user.interest,
              response.data.user.links
            ),
          );
        } 
      } 
    } catch (err) {
      console.log(err.message);
      if (err.message.includes('401')) {
        dispatch(reqFailure('Invalid credentials!'));
      } else {
        console.log(err.response.data.error);
        Alert.alert(err.response.data.error);
        dispatch(reqFailure(err.response.data.error));
      }
    }
  };
};

export const regUserUp = regData => {
  return async dispatch => {
    dispatch(req())
    try {
      const response = await axios.post(
        BASE_URL+`/api/auth/user/register`,
        {
          email: regData.email,
          name: regData.name,
          phoneNo: regData.phoneNo,
          password: regData.password,
        },
      );
        if (response) {
          const userData = JSON.stringify({
            email: response.data.user.email,
            id: response.data.user._id,
            accessToken: response.data.token,
            name: response.data.user.name,
            phoneNo: response.data.user.phoneNo,
            maritalStatus: response.data.user.maritalStatus,
            interest: response.data.user.interest,
            links: response.data.user.links,
          });
          await AsyncStorage.setItem('secondSelfAuthToken', userData);
          console.log('Saved data to async storage!', userData);
          dispatch(
            reqSuccess(
              response.data.token,
              response.data.user.email,
              response.data.user._id,
              response.data.user.name,
              response.data.user.phoneNo,
              response.data.user.maritalStatus,
              response.data.user.interest,
              response.data.user.links
            ),
          );
        }
    } catch (err) {
      console.log(err.message);
      if (err.message.includes('401')) {
        dispatch(reqFailure('Invalid credentials!'));
      } else {
        console.log(err.mesage);
        dispatch(reqFailure(err.message));
      }
    }
  };
};

export const tokenRetriever = () => {
  // console.log('login works567');
  return async dispatch => {
    // console.log('login works123');
    try {
      const userData = await AsyncStorage.getItem('secondSelfAuthToken');
      const loggedData = userData != null ? JSON.parse(userData) : null;
      // console.log('login works 2', userData);
      console.log('login works', loggedData);
      if (loggedData != null) {
        dispatch(
          reqSuccess(
            loggedData.accessToken,
            loggedData.email,
            loggedData.id,
            loggedData.name,
            loggedData.phoneNo,
            loggedData.maritalStatus,
            loggedData.interest,
            loggedData.links
          ),
        );
      }
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('token retriever error: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      // dispatch(logUserOut());
      dispatch(reqFailure(''));
    }
  };
};

export const uploadDoc = (image,id) => {
  return async dispatch => {
    dispatch(req())
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: image.filename || `filename${image.size}.jpg`,
    });
      const response = await axios.post(
        BASE_URL+`/api/upload/idProof/${id}`,
        formData,
        {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data'
          }
      }
      );
      if(response){
        dispatch(doc(response.data))
      }

    } catch (err) {
      console.log('unable to upload doc: ', err.message)
      dispatch(reqFailure(err.message));
      Alert.alert(err.message)
    }
  };
};

export const logUserOut = () => {
  // console.log('logging out');
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('secondSelfAuthToken');
      dispatch(logout())
      console.log('Async Storage emptied!');
    } catch (err) {
      console.log('unable to logout: ', err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
