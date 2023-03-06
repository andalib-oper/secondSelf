const { REQ_FAILURE_PROFILE, GET_PROFILE_DETAILS, REQ_PROFILE} = require('./actionTypes');

const initialState = {
  profileDetails:[],
  loading:false,
  error:''
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PROFILE_DETAILS: {
      return {
        ...state,
        profileDetails: action.data,
        loading: false,
      };
    }
    case REQ_FAILURE_PROFILE: {
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

export default ProfileReducer;
