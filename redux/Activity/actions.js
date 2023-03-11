import {
  ACTIVE_ACTIVITY,
  COMPLETED_ACTIVITY,
  CREATE_ACTIVITY,
  GET_ACTIVITY_BY_CITY,
  GET_ACTIVITY_BY_USERID,
  JOIN_USER,
  REQ_ACTIVITY,
  REQ_FAILURE_ACTIVITY,
  UPCOMING_ACTIVITY,
} from './actionTypes';
import {BASE_URL} from '@env';
import axios from 'axios';

export const reqActivity = () => ({
  type: REQ_ACTIVITY,
});

export const createActivity = data => ({
  type: CREATE_ACTIVITY,
  data,
});

export const activityByUserId = data => ({
  type: GET_ACTIVITY_BY_USERID,
  data,
});

export const activityByCity = data => ({
  type: GET_ACTIVITY_BY_CITY,
  data,
});

export const joinUser = data => ({
  type: JOIN_USER,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE_ACTIVITY,
  error: error,
});

export const createActivityByUserId = (
  authId,
  description,
  place,
  city,
  date,
  time,
) => {
  return async dispatch => {
    dispatch(reqActivity());
    try {
      const response = await axios.post(BASE_URL + `/api/activity`, {
        description: description,
        date: date,
        time: time,
        place: place,
        city: city,
        organizer: authId,
      });
      if (response) {
        dispatch(createActivity(response.data));
        dispatch(getActivityByUserId(authId));
        // console.log("res",response.data)
      }
    } catch (err) {
      console.log('request failed activity');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const getActivityByCity = city => {
  return async dispatch => {
    dispatch(reqActivity());
    try {
      const response = await axios.get(BASE_URL + `/api/activity?city=${city}`);
      if (response) {
        dispatch(activityByCity(response.data));
      }
    } catch (err) {
      console.log('request failed activity');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const getActivityByUserId = authId => {
  return async dispatch => {
    dispatch(reqActivity());
    try {
      const response = await axios.get(
        BASE_URL + `/api/activity/user/${authId}`,
      );
      if (response) {
        dispatch(activityByUserId(response.data));
      }
    } catch (err) {
      console.log('request failed activity');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const joinUsersInActivity = (activityId, authId) => {
  return async dispatch => {
    dispatch(reqActivity());
    console.log('act', activityId);
    try {
      const response = await axios.post(
        BASE_URL + `/api/activity/${activityId}/participants`,
        {
          userId: authId,
        },
      );
      if (response) {
        dispatch(joinUser(response.data));
        dispatch(getActivityByUserId(authId));
        console.log('joining', response.data);
      }
    } catch (err) {
      console.log('request failed activity joining');
      console.log(err.response.data);
      dispatch(reqFailure(err.message));
    }
  };
};
