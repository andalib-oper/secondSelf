import {
  ACTIVE_ACTIVITY,
  COMPLETED_ACTIVITY,
  CREATE_ACTIVITY,
  GET_ACTIVITY_BY_USERID,
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

export const reqFailure = error => ({
  type: REQ_FAILURE_ACTIVITY,
  error: error,
});

export const createActivityByUserId = (
  authId,
  description,
  location,
  date,
  time,
) => {
  return async dispatch => {
    dispatch(reqActivity());
    try {
      const response = await axios.post(BASE_URL + `/api/activity`, {
        description: description,
        location: location,
        date: date,
        time: time,
        organizer: authId,
      });
      if (response) {
        dispatch(createActivity(response.data));
        dispatch(getActivityByUserId(authId))
        // console.log("res",response.data)
      }
    } catch (err) {
      console.log('request failed activity');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const getActivityByUserId = (authId) => {
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