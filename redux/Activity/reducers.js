const { REQ_ACTIVITY,REQ_FAILURE_ACTIVITY, 
  CREATE_ACTIVITY,
  UPCOMING_ACTIVITY, 
  ACTIVE_ACTIVITY, 
  COMPLETED_ACTIVITY, 
  GET_ACTIVITY_BY_USERID} = require('./actionTypes');

const initialState = {
  createActivity:[],
  activityActive:[],
  activityUpcoming:[],
  activityCompleted:[],
  activity:[],
  loading:false,
  error:''
};

const ActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_ACTIVITY: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_ACTIVITY: {
      return {
        ...state,
        createActivity: action.data,
        loading: false,
      };
    }
    case UPCOMING_ACTIVITY: {
      return {
        ...state,
        activityUpcoming: action.data,
        loading: false,
      };
    }
    case GET_ACTIVITY_BY_USERID: {
      console.log("red",action.data)
      return {
        ...state,
        activity: action.data,
        loading: false,
      };
    }
    case ACTIVE_ACTIVITY: {
        return {
          ...state,
          activityActive: action.data,
          loading: false,
        };
      }
      case COMPLETED_ACTIVITY: {
        return {
          ...state,
          activityCompleted: action.data,
          loading: false,
        };
      }
    case REQ_FAILURE_ACTIVITY: {
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

export default ActivityReducer;
