import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, fetchUser, postWeek, currentMonth, currentUser } from '../Actions/calendarApp_actions';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class CalendarApp extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const date = new Date();
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchUser(date.getMonth() + 1, 1))
    }
    render() {
        return (
            <div>
                <div>
                    <select onChange={ event => this.props.dispatch(currentUser(event.target.value))}>
                        {this.props.users.map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <DayPicker />
                </div>
                <div>
                    <button>Accept</button>
                    <button>Reject</button>
                </div>
            </div>
        )
    }
};

const mapStateToProps = function (store) {
    return {
        users: store.calendarAppReducer.users,
        selectedUser: store.calendarAppReducer.selectedUser
    };
};

export default connect(mapStateToProps)(CalendarApp);