import { combineReducers } from 'redux';

import apiCallsReducer from './apiCalls_reducer';
import userOperationsReducer from './userOperations_reducer';

const reducers = combineReducers({
    apiCallsReducer,
    userOperationsReducer
});

export default reducers;