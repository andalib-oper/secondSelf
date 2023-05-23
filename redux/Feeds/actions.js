import {BASE_URL} from '@env';
import axios from 'axios';
import {GET_ALL_STORIES, REQ_FAILURE_FEEDS, REQ_FEEDS} from './actionTypes';

export const reqFeeds = () => ({
  type: REQ_FEEDS,
});

export const stories = data => ({
  type: GET_ALL_STORIES,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE_FEEDS,
  error: error,
});

export const getStories = city => {
  return async dispatch => {
    dispatch(reqFeeds());
    try {
      const response = await axios.get(BASE_URL + `/api/story?city=Kolkata`);
      if (response) {
        console.log('response', response.data);
        dispatch(stories(response.data));
      }
    } catch (err) {
      console.log('request failed stories');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
