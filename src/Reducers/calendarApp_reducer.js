import { FETCH_USERS, 
        FETCH_USERS_FULFILLED, 
        FETCH_USERS_REJECTED, 
        FETCH_USER, 
        FETCH_USER_FULFILLED, 
        FETCH_USER_REJECTED, 
        POST_WEEK_REJECTED } from '../Actions/calendar_actions';

const initialState = {
    users: [],
    selectedUser: [], //TBU with FETCH_USER
    fetching: false,
    fetched: false,
    error: null
};

const calendarAppReducer = function (state = initialState, action){
    switch (action.type){
        case FETCH_USERS:
            return Object.assign({}, state, { fetching: true })
        case FETCH_USERS_FULFILLED:
            return Object.assign({}, state, { fetching: false, fetched: true, users: action.payload })
        case FETCH_USERS_REJECTED:
            return Object.assign({}, state, { fetching: false, error: action.payload })
        case FETCH_USER:
            return Object.assign({}, state, { fetching: true, fetched: false })
        case FETCH_USER_FULFILLED:
            return Object.assign({}, state, { fetching: false, fetched: true, selectedUser: action.payload })
        case FETCH_USER_REJECTED:
            return Object.assign({}, state, { fetching: false, error: action.payload })
        case POST_WEEK_REJECTED:
            return Object.assign({}, state, {error: action.payload}) 
        default:
            return state;
    }
};

export default calendarAppReducer;