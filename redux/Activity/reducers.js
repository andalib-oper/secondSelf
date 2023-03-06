const { REQ_ACTIVITY,REQ_FAILURE_ACTIVITY, UPCOMING_ACTIVITY, ACTIVE_ACTIVITY, COMPLETED_ACTIVITY } = require('./actionTypes');

const initialState = {
  activityActive:[],
  activityUpcoming:[],
  activityCompleted:[],
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
    case UPCOMING_ACTIVITY: {
      return {
        ...state,
        activityUpcoming: action.data,
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
