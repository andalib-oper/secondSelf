import {BASE_URL} from '@env';
import axios from 'axios';
import {
  ADD_USER_IN_GROUP,
  CREATE_GROUP,
  FILTERED,
  GET_ALL_CHAT_USERID,
  REQ_CHAT,
  REQ_FAILURE_CHAT,
} from './actionTypes';

export const reqProfile = () => ({
  type: REQ_CHAT,
});

export const getChat = data => ({
  type: GET_ALL_CHAT_USERID,
  data,
});

export const joinUser = data => ({
  type: ADD_USER_IN_GROUP,
  data,
});

export const filtering = data => ({
  type: FILTERED,
  data,
});

export const createGroup = data => ({
  type: CREATE_GROUP,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE_CHAT,
  error: error,
});

export const getChatByUserId = authId => {
  return async dispatch => {
    dispatch(reqProfile());
    try {
      const response = await axios.get(
        BASE_URL + `/api/groupChats/user/${authId}`,
      );
      if (response) {
        dispatch(getChat(response.data));
        dispatch(filtering(response.data));
        console.log('res at chat', response.data);
      }
    } catch (err) {
      console.log('request failed chat');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const createGroupByUserId = (authId, description, name, members) => {
  return async dispatch => {
    dispatch(reqProfile());
    try {
      const response = await axios.post(BASE_URL + `/api/groupChats`, {
        name: name,
        description: description,
        members: members,
      });
      if (response) {
        dispatch(createGroup(response.data));
        dispatch(getChatByUserId(authId));
        console.log('res at chat', response.data);
      }
    } catch (err) {
      console.log('request failed activity');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const joinUsersInGroup = (groupId, authId) => {
  return async dispatch => {
    dispatch(reqProfile());
    console.log('grop', groupId, authId);
    try {
      const response = await axios.post(
        BASE_URL + `/api/groupChats/${groupId}/add-user`,
        {
          userId: authId,
        },
      );
      if (response) {
        dispatch(joinUser(response.data));
        dispatch(getChatByUserId(authId));
        console.log('res at chat', response.data);
      }
    } catch (err) {
      console.log('request failed joining group');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
