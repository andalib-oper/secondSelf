import {BASE_URL} from '@env'
import axios from 'axios'
import { GET_ALL_CHAT_USERID, REQ_CHAT, REQ_FAILURE_CHAT } from './actionTypes'

export const reqProfile = () =>({
    type: REQ_CHAT
})

export const getChat = (data) =>({
    type: GET_ALL_CHAT_USERID,
    data
})

export const reqFailure = error => ({
    type: REQ_FAILURE_CHAT,
    error: error,
  });

export const getChatByUserId = (authId) => {
    return async (dispatch) => {
        dispatch(reqProfile());
        try {
            const response = await axios.get(
                // BASE_URL+`/api/auth/user/${authId}/details`
            );
            if (response) {
                dispatch(getChat(response.data));
            }
        } catch (err) {
            console.log("request failed chat")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}