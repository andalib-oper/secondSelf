import {GET_ALL_POST_BY_CITY, REQ_FAILURE_POST, REQ_POST,LIKE,DISLIKE, COMMENT } from "./actionTypes";
import {BASE_URL} from '@env'
import axios from 'axios';

export const reqPost = () => ({
  type: REQ_POST,
});

export const like = (data) => ({
    type: LIKE,
    data
  });

  export const dislike = (data) => ({
    type: DISLIKE,
    data
  });

  export const comment = (data) => ({
    type: COMMENT,
    data
  });

  export const postCity = (data) => ({
    type: GET_ALL_POST_BY_CITY,
    data
  });

  export const reqFailure = error => ({
    type: REQ_FAILURE_POST,
    error: error,
  });

  export const getPostByCity = (city) => {
    return async (dispatch) => {
        dispatch(reqPost());
        try {
            const response = await axios.get(
                BASE_URL+`/api/post?city=kolkata`
            );
            if (response) {
                dispatch(postCity(response.data));
            }
        } catch (err) {
            console.log("request failed stories")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}

export const postLike = (postId,authId,city) => {
    return async (dispatch) => {
        dispatch(reqPost());
        try {
            const response = await axios.put(
                BASE_URL+`/api/post/${postId}/user/${authId}/like`
            );
            if (response) {
                dispatch(like(response.data))
                dispatch(getPostByCity(city))
            }
        } catch (err) {
            console.log("request failed like post")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}

export const postDislike = (postId,authId,city) => {
    return async (dispatch) => {
        dispatch(reqPost());
        try {
            const response = await axios.put(
                BASE_URL+`/api/post/${postId}/user/${authId}/dislike`
            );
            if (response) {
                dispatch(like(response.data))
                dispatch(getPostByCity(city))
            }
        } catch (err) {
            console.log("request failed like post")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}

export const postComment = (postId,authId,city) => {
    return async (dispatch) => {
        dispatch(reqPost());
        try {
            const response = await axios.put(
                BASE_URL+`/api/post/${postId}/user/${authId}/comment`
            );
            if (response) {
                dispatch(comment(response.data))
                dispatch(getPostByCity(city))
            }
        } catch (err) {
            console.log("request failed comment")
            console.log(err.message)
            dispatch(reqFailure(err.message))
        }
    };
}

