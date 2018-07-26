import { createStore, applyMiddleware } from '../../../../Library/Caches/typescript/2.9/node_modules/redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/RootReducer';

const store = createStore(
    RootReducer,
    applyMiddleware(thunk)
)

export default store;