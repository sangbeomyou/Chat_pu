import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from './user';
import member from './member';

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // user, member reducer 중에 user reducer만 localstorage에 저장합니다.
  whitelist: ["user"]
  // blacklist -> 그것만 제외합니다
};

const appReducer  = combineReducers({
    user,
    member
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }

export default persistReducer(persistConfig, rootReducer);