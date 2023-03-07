import {BASE_URL} from '@env';
import axios from 'axios';
import {
  COVER_PIC,
  EDIT_PROFILE,
  GET_PROFILE_DETAILS,
  PROFILE_PIC,
  REQ_FAILURE_PROFILE,
  REQ_PROFILE,
} from './actionTypes';

export const reqProfile = () => ({
  type: REQ_PROFILE,
});

export const getProfileDetails = data => ({
  type: GET_PROFILE_DETAILS,
  data,
});

export const editProfile = data => ({
    type: EDIT_PROFILE,
    data,
  });

export const profilePic = data => ({
  type: PROFILE_PIC,
  data,
});

export const coverPic = data => ({
  type: COVER_PIC,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE_PROFILE,
  error: error,
});

export const getProfileDetailsByUserId = authId => {
  return async dispatch => {
    dispatch(reqProfile());
    try {
      const response = await axios.get(
        BASE_URL + `/api/auth/user/${authId}/details`,
      );
      if (response) {
        dispatch(getProfileDetails(response.data));
      }
    } catch (err) {
      console.log('request failed stories');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const newProfilePicture = (image, authId) => {
  return async dispatch => {
    dispatch(reqProfile());
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: image.filename || `filename${image.size}.jpg`,
      });
      const response = await axios.post(
        BASE_URL + `/api/upload/profilePic/${authId}`,
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response) {
        dispatch(profilePic(response.data));
        dispatch(getProfileDetailsByUserId(authId))
      }
    } catch (err) {
      console.log('request failed stories');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const newCoverPicture = (image, authId) => {
  return async dispatch => {
    dispatch(reqProfile());
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image.path,
        type: image.mime,
        name: image.filename || `filename${image.size}.jpg`,
      });
      const response = await axios.post(
        BASE_URL + `/api/upload/coverPic/${authId}`,
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response) {
        dispatch(coverPic(response.data));
        dispatch(getProfileDetailsByUserId(authId))
      }
    } catch (err) {
      console.log('request failed stories');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const editProfileDetails = (
    authId,
    name,
    bio,
    phoneNo,
    location,
    gender,
    maritalStatus,
    work,
    interest,
    links
    ) => {
    return async dispatch => {
      dispatch(reqProfile());
      try {
        const response = await axios.put(
          BASE_URL + `/api/auth/user/${authId}/update`,
          {
            name:name,
            bio:bio,
            phoneNo: phoneNo,
            location:location,
            gender:gender,
            location:location,
            maritalStatus:maritalStatus,
            occupation:work,
            interest: interest,
            links:links
          }
        );
        if (response) {
          dispatch(editProfile(response.data));
          dispatch(getProfileDetailsByUserId(authId))
        }
      } catch (err) {
        console.log('request failed edit profile');
        console.log(err.message);
        dispatch(reqFailure(err.message));
      }
    };
  };