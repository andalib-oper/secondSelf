const {LIKE,DISLIKE, GET_ALL_POST_BY_CITY, REQ_FAILURE_POST, COMMENT, REQ_POST} = require('./actionTypes');

const initialState = {
  postCity:[],
  likePost:[],
  dislikePost:[],
  comment:[],
  loading:false,
  error:''
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_POST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ALL_POST_BY_CITY: {
      return {
        ...state,
        postCity: action.data,
        loading: false,
      };
    }
    case LIKE: {
        return {
          ...state,
          likePost: action.data,
          loading: false,
        };
      }
      case DISLIKE: {
        return {
          ...state,
          dislikePost: action.data,
          loading: false,
        };
      }
      case COMMENT: {
        return {
          ...state,
          comment: action.data,
          loading: false,
        };
      }
    case REQ_FAILURE_POST: {
        return{
         ...state,
         loading:false,
         error: action.data
        }
       }
    default:
      return state;
  }
};

export default PostReducer;
