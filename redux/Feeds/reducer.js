const {LIKE} = require('./actionTypes');

const initialState = {
  like: [],
};

const FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE: {
      return {
        ...state,
        like: action.data,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default FeedReducer;
