import { ActivityIndicatorComponent } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  LOGOUT,
} from './actionTypes';


const initialState = {
    isLoggedIn: false,
    email: "",
    firstName: "",
    lastName: "",
    id: "",
    accessToken: "",
    // refreshToken: "",
    role: "",
    loading: "",
    error: ""
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQ: {
        // console.log("auth started")
        return{
          ...state,
          loading: true
        }
      }
      case REQ_SUCCESS: {
        // console.log(action)
        return {
          ...state,
          loading: false,
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          id: action.id,
          accessToken: action.accessToken,
          role: action.role,
          isLoggedIn: true,
          error: '',
        };
      }
      case REQ_FAILURE: {
        if(action.error){
          showMessage({
            message: 'Error',
            description: action.error,
            type: 'danger',
          });
        }
      }
      case LOGOUT: {
        const currUserId = state.userId;
        console.log("logout successfully at auth reducer");
        return {
          ...initialState
        };
      }
      default:
        return state;
    }
  };
  
  export default authReducer;