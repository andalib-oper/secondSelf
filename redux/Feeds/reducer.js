const {REQ_FEEDS, GET_ALL_STORIES, REQ_FAILURE_FEEDS} = require('./actionTypes');

const initialState = {
  stories:[],
  loading:false,
  error:''
};

const FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_FEEDS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ALL_STORIES: {
      return {
        ...state,
        stories: action.data,
        loading: false,
      };
    }
    case REQ_FAILURE_FEEDS: {
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

export default FeedReducer;
