import moment from 'moment';

const { REQ_ACTIVITY,REQ_FAILURE_ACTIVITY, 
  CREATE_ACTIVITY,
  GET_ACTIVITY_BY_USERID,
  JOIN_USER} = require('./actionTypes');

const initialState = {
  createActivity:[],
  activityActive:[],
  activityUpcoming:[],
  activityCompleted:[],
  activity:[],
  joinUser:[],
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
    case GET_ACTIVITY_BY_USERID: {
      let date = moment().format('YYYY-MM-DD')
      let time = new Date().toLocaleTimeString()
      let arr = action.data.filter((i)=>i.date===date)
      let arr1 =action.data.filter((i)=>i.date>=date)
      let arr2=action.data.filter((i)=>i.date<date && i.time<time )
      return {
        ...state,
        activity: action.data,
        activityActive: arr,
        activityUpcoming:arr1,
        activityCompleted:arr2,
        loading: false,
      };
    }
    case JOIN_USER: {
      console.log("join user", action.data)
      return {
        ...state,
        joinUser: action.data,
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
