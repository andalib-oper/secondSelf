import {BASE_URL} from '@env'
import axios from 'axios'
import { GET_PROFILE_DETAILS, REQ_FAILURE_PROFILE, REQ_PROFILE } from './actionTypes'

export const reqProfile = () =>({
    type: REQ_PROFILE
})

export const getProfileDetails = (data) =>({
    type: GET_PROFILE_DETAILS,
    data
})

export const reqFailure = error => ({
    type: REQ_FAILURE_PROFILE,
    error: error,
  });

export const getProfileDetailsByUserId = (authId) => {
    return async (dispatch) => {
        dispatch(reqProfile());
        try {
            const response = await axios.get(
                BASE_URL+`/api/auth/user/${authId}/details`
            );
            if (response) {
                dispatch(getProfileDetails(response.data));
            }
        } catch (err) {
            console.log("request failed stories")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}