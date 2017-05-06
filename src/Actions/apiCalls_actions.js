import axios from 'axios';
import { normalize } from 'normalizr';
import monthSchema from '../schema';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';
export const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';
export const POST_WEEK_REJECTED = 'POST_WEEK_REJECTED';


export function fetchUsers() {
    return function (dispatch) {
        axios.get('https://timesheet-staging-aurity.herokuapp.com/api/users')
            .then((res) => {
                dispatch({ type: FETCH_USERS_FULFILLED, payload: res.data });
            })
            .catch((err) => {
                dispatch({ type: FETCH_USERS_REJECTED, payload: err });
            });
    };
}

export function fetchUser(month, user) {
    return function (dispatch) {
        axios.get(`https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/${month}/2017/${user}`)
            .then((res) => {
                const response = res.data;
                const originalData = response.data;
                const normalizedData = normalize(originalData, monthSchema);
                dispatch({ type: FETCH_USER_FULFILLED, payload: normalizedData.entities });
            })
            .catch((err) => {
                dispatch({ type: FETCH_USER_REJECTED, payload: err });
            });
    };
}

export function postWeek(week, approved, week_status) {
    return function (dispatch) {
        axios.put(`https://timesheet-staging-aurity.herokuapp.com/api/training/weeks/${week}/users/${approved}`, { status: week_status })
            .catch((err) => {
                dispatch({ type: POST_WEEK_REJECTED, payload: err });
            });
    };
}