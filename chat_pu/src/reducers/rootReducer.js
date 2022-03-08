import { combineReducers } from 'redux';

import user from './user';
import member from './member';

const rootReducer = combineReducers({
    user,
    member
});

export default rootReducer;