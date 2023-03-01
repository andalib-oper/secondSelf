import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import loginReducer from './Login/reducers'
import emailReducer from './emailConfirm/reducer'
import regReducer from './register/reducer';
import FeedReducer from './Feeds/reducer';

const rootReducer = combineReducers({
  authState: authReducer,
  loginFormState: loginReducer,
  emailFormState: emailReducer,
  registerFormState: regReducer,
  feedState: FeedReducer
});

export default rootReducer;