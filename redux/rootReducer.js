import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import loginReducer from './Login/reducers'
import emailReducer from './emailConfirm/reducer'
import regReducer from './register/reducer';
import FeedReducer from './Feeds/reducer';
import PostReducer from './Post/reducers';
import ActivityReducer from './Activity/reducers';
import ProfileReducer from './Profile/reducers';
import ChatReducer from './Chat/reducers';

const rootReducer = combineReducers({
  authState: authReducer,
  loginFormState: loginReducer,
  emailFormState: emailReducer,
  registerFormState: regReducer,
  feedState: FeedReducer,
  postState:PostReducer,
  activityState:ActivityReducer,
  profileState:ProfileReducer,
  chatState:ChatReducer
});

export default rootReducer;