const {REQ_FAILURE_CHAT, GET_ALL_CHAT_USERID, REQ_CHAT, CREATE_GROUP, ADD_USER_IN_GROUP, FILTERED} = require('./actionTypes');

const initialState = {
  chats:[],
  createGroup:[],
  filtered:[],
  joinUser:[],
  loading:false,
  error:''
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_CHAT: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ALL_CHAT_USERID: {
      return {
        ...state,
        chats: action.data,
        loading: false,
      };
    }
    case CREATE_GROUP: {
      return {
        ...state,
        createGroup: action.data,
        loading: false,
      };
    }
    case ADD_USER_IN_GROUP: {
      return {
        ...state,
        joinUser: action.data,
        loading: false,
      };
    }
    case FILTERED: {
      return {
        ...state,
        filtered: action.data,
        loading: false,
      };
    }
    case REQ_FAILURE_CHAT: {
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

export default ChatReducer;
