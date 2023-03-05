import {ActivityIndicatorComponent} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  REQ,
  REQ_SUCCESS,
  UPLOAD_DOCUMENT,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  LOGOUT,
} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  email: '',
  name: '',
  phoneNo: '',
  id: '',
  accessToken: '',
  maritalStatus: '',
  interest: [],
  links: [],
  uploadDoc: '',
  loading:false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ: {
      return {
        ...state,
        loading: true,
      };
    }
    case REQ_SUCCESS: {
      return {
        ...state,
        loading: false,
        email: action.email,
        name: action.name,
        id: action.id,
        accessToken: action.accessToken,
        phoneNo: action.phoneNo,
        interest: action.interest,
        maritalStatus: action.maritalStatus,
        links: action.links,
        isLoggedIn: true,
        error: '',
      };
    }
    case UPLOAD_DOCUMENT: {
      return {
        ...state,
        loading: false,
        uploadDoc: action.data,
      };
    }
    case REQ_FAILURE: {
     return{
      ...state,
      loading:false,
      error: action.data
     }
    }
    case LOGOUT: {
      const currUserId = state.userId;
      console.log('logout successfully at auth reducer');
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
