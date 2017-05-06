import {
    CURRENT_USER,
    CURRENT_MONTH,
    SELECTED_WEEK
} from '../Actions/userOperations_actions';

const initialState = {
    currentMonth: 10,
    currentUser: 1,
    selectedWeek: 0,
};

const userOperationsReducer = function (state = initialState, action) {
    switch (action.type) {
        case CURRENT_USER:
            return Object.assign({}, state, { currentUser: action.id });
        case CURRENT_MONTH:
            return Object.assign({}, state, { currentMonth: action.month });
        case SELECTED_WEEK:
            return Object.assign({}, state, { selectedWeek: action.week_id });
        default:
            return state;
    }
};

export default userOperationsReducer;