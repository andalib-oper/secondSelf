import {GET_ALL_POST_BY_CITY, REQ_FAILURE_POST, REQ_POST,LIKE,DISLIKE, COMMENT, GET_ALL_POST_BY_USERID, CREATE_POST } from "./actionTypes";
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
  export const createPost = data => ({
    type: CREATE_POST,
    data,
  });
  export const postCity = (data) => ({
    type: GET_ALL_POST_BY_CITY,
    data
  });

  export const postUserId = (data) => ({
    type: GET_ALL_POST_BY_USERID,
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

export const getPostByUserId = (authId) => {
    return async (dispatch) => {
        dispatch(reqPost())
        try {
            const response = await axios.get(
                BASE_URL+`/api/post/user/${authId}`
            );
            if (response) {
                dispatch(postUserId(response.data))
                // console.log("res",response.data)
            }
        } catch (err) {
            console.log("request failed user post")
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
                dispatch(dislike(response.data))
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

export const createPostByUserId = (
    authId,
    description,
   content,
   city
  ) => {
    return async dispatch => {
      dispatch(reqPost());
      console.log("olol",  authId,
      description,
     content,
     city)
      try {
        const formData = new FormData();
      formData.append('content',{
        uri: content.path,
        type: content.type,
        name: content.filename || `filename${content.size}.jpg`,
      })
      / formData.append('description', description)
      formData.append('city', city)
      formData.append('userId', authId)
        const response = await axios.post(BASE_URL + `/api/post`, 
         formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
    );
        if (response) {
          dispatch(createPost(response.data));
          console.log("respo",response.data)
        }
      } catch (err) {
        console.log('request failed post');
        console.log(err.message);
        dispatch(reqFailure(err.message));
      }
    };
  };
