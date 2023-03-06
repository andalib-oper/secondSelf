import {ACTIVE_ACTIVITY, COMPLETED_ACTIVITY, REQ_ACTIVITY, REQ_FAILURE_ACTIVITY, UPCOMING_ACTIVITY } from "./actionTypes";
import {BASE_URL} from '@env'
import axios from 'axios';

export const reqActivity = () => ({
  type: REQ_ACTIVITY,
});

  export const upcomingActivity = (data) => ({
    type: UPCOMING_ACTIVITY,
    data
  });

  export const activeActivity = (data) => ({
    type: ACTIVE_ACTIVITY,
    data
  });

  export const completedActivity = (data) => ({
    type: COMPLETED_ACTIVITY,
    data
  });

  export const reqFailure = error => ({
    type: REQ_FAILURE_ACTIVITY,
    error: error,
  });

  export const getActivityByUserId = (authId,status) => {
    return async (dispatch) => {
        dispatch(reqActivity());
        try {
            if(status=='UPCOMING'){
                const response = await axios.get(
                    BASE_URL+`/api/activity/user/${authId}`
                );
                if (response) {
                    dispatch(upcomingActivity(response.data));
                }
            }
            else if (status=='ACTIVE'){
                const response = await axios.get(
                    BASE_URL+`/api/activity/user/${authId}`
                );
                if (response) {
                    dispatch(activeActivity(response.data));
                }
            }
            else if (status=='COMPLETED'){
                const response = await axios.get(
                    BASE_URL+`/api/activity/user/${authId}`
                );
                if (response) {
                    dispatch(completedActivity(response.data));
                }
            }
        } catch (err) {
            console.log("request failed activity")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}