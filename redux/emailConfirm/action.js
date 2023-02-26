import axios from 'axios';
import {
    STATE_CLEANUP,
    UPDATE_FIELDS_EMAIL,
    REQ_SUCCESS_NEW_PASSWORD,
    PASSWORD_SUCCESS,
    PASSWORD_FAILURE,
    GET_ALL_EMAIL,
    EMAIL_SUCCESS,
    EMAIL_FAILURE,
    REQ_SUCCESS_EMAIL_CHECK,
    REQ_START,
    BLUR_FIELDS_EMAIL,
} from './actionTypes';
// import { IAMURL } from '@env';

export const req = () => {
    console.log('started');
    return {
        type: REQ_START
    };
};

export const updateFields = (val, fieldId, isValid) => ({
    type: UPDATE_FIELDS_EMAIL,
    val,
    fieldId,
    isValid
})

export const blurFields = (fieldId) => ({
    type: BLUR_FIELDS_EMAIL,
    fieldId
})


export const stateCleanup = () => ({
    type: STATE_CLEANUP,
});


export const reqSuccess = () => ({
    type: EMAIL_SUCCESS,
});

export const reqFailure = (error) => ({
    type: EMAIL_FAILURE,
    error: error,
});

export const reqSuccessGetEmail = () => ({
    type: GET_ALL_EMAIL,
})

export const reqSuccessCheckEmail = () => ({
    type: REQ_SUCCESS_EMAIL_CHECK,
})

export const reqSuccessPassword = (data) => ({
    type: PASSWORD_SUCCESS,
    data,
});

export const reqFailurePassword = (error) => ({
    type: PASSWORD_FAILURE,
    error: error,
});

export const reqSuccessGetPassword = () => ({
    type: GET_ALL_PASSWORD,
})

export const reqSuccessNewPassword = (_id) => ({
    type: REQ_SUCCESS_NEW_PASSWORD,
    _id
})

export const newPassword = (data) => {
    return async (dispatch) => {
        dispatch(req());
        try {
            // console.log("passowrd token", accessToken)
            const response = await axios.post(
                // IAMURL +
                'https://paradis-be-iam.herokuapp.com/api/auth/reset',
                {
                    email: data.email,
                    password: data.cpassword
                },
                // {
                //     headers: { Authorization: "Bearer " + accessToken },
                // }
            );
            if (response.headers.error) {
                dispatch(reqFailure('input fields correctly'));
                console.log(response.headers.error);
            }
            else if (response) {
                dispatch(reqSuccessNewPassword());
            }
            else {
                dispatch(reqFailure("error adding password"));
                console.log("something is not right please try again")
            }
        } catch (err) {
            console.log("request failed")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}

// const navigate = useNavigation()

export const checkEmail = (emailData) => {
    return async (dispatch) => {
        dispatch(req());
        try {
            const response = await axios.post(
                'https://byit-be-iam.herokuapp.com/api/distributor/check/email',
                {
                    email: emailData.email,
                },
            );
            if (response.headers.error) {
                dispatch(reqFailure('input fields correctly'));
                console.log(response.headers.error);
            }
            else if (response) {
                if (response.status == 200) {
                    dispatch(reqSuccessCheckEmail())
                    // dispatch(CommonActions.navigate('updatepassword'))
                } else {
                    dispatch(reqFailure());
                }
                dispatch(reqFailure());
            }
            else {
                dispatch(reqFailure("error adding password"));
                console.log("something is not right please try again")
            }
        } catch (err) {
            console.log("request failed")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}