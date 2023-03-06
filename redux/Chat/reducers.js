const {REQ_FAILURE_CHAT, GET_ALL_CHAT_USERID, REQ_CHAT} = require('./actionTypes');

const initialState = {
  chats:[],
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
