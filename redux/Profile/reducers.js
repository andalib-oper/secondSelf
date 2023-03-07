const { REQ_FAILURE_PROFILE, GET_PROFILE_DETAILS, REQ_PROFILE, PROFILE_PIC, COVER_PIC, EDIT_PROFILE} = require('./actionTypes');

const initialState = {
  profileDetails:[],
  profilePic:[],
  coverPic:[],
  editProfile:[],
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
    case PROFILE_PIC: {
      return {
        ...state,
        profilePic: action.data,
        loading: false,
      };
    }
    case COVER_PIC: {
      return {
        ...state,
        coverPic: action.data,
        loading: false,
      };
    }
    case EDIT_PROFILE: {
      return {
        ...state,
        editProfile: action.data,
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
