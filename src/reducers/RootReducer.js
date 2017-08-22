import { combineReducers } from 'redux-immutable';

import TopicsReducer from './TopicsReducer';

const RootReducer = combineReducers({
    TopicsReducer
})

export default RootReducer;