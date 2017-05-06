import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, fetchUser, postWeek } from '../Actions/apiCalls_actions.js';
import { currentMonth, currentUser, selectedWeek } from '../Actions/userOperations_actions.js';

import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

class CalendarApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: null,
            to: null
        };
        this.handleDayClick = this.handleDayClick.bind(this);
    }
    componentWillMount() {
        const date = new Date();
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchUser(date.getMonth() + 1, 1));
        this.props.dispatch(currentMonth(date.getMonth() + 1));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentMonth !== this.props.currentMonth) {
            this.props.dispatch(fetchUser(nextProps.currentMonth, this.props.currentUser));
        } else if (nextProps.currentUser !== this.props.currentUser) {
            this.props.dispatch(fetchUser(this.props.currentMonth, nextProps.currentUser));
        }
    }
    handleDayClick(day) {
        const momentDay = moment(day);
        let range = {
            from: momentDay.day('Monday').toDate(),
            to: momentDay.day('Sunday').add(1, 'week').toDate()
        };
        if (moment(day).day() === 0) {
            range = {
                from: moment(day).toDate(),
                to: moment(day).subtract(6, 'days').toDate()
            };
        }

        const foundWeek = Object.values(this.props.selectedUser.weeks)
            .find(week => week.days_in_week.some(day => day === momentDay.date()));
        const weekId = foundWeek.week_id;
        this.props.dispatch(selectedWeek(weekId));
        this.setState(range);
    }
    render() {
        const { from, to } = this.state;
        return (
            <div>
                <div>
                    <select onChange={event => this.props.dispatch(currentUser(event.target.value))}>
                        {this.props.users.map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <DayPicker
                        onMonthChange={month => this.props.dispatch(currentMonth(month.getMonth() + 1))}
                        selectedDays={[from, { from, to }]}
                        onDayClick={day => this.handleDayClick(day)}
                        renderDay={day => {
                            if (!this.props.selectedUser || !this.props.selectedUser.days) {
                                return <div><span>{day.getDay()}</span></div>;
                            }
                            const dayOfMonth = moment(day).date();
                            const { days } = this.props.selectedUser;
                            const dayDetails = days[dayOfMonth];
                            let formattedTime = '0:0';
                            if (dayDetails && dayDetails.hours && dayDetails.minutes) {
                                formattedTime = `${dayDetails.hour}:${dayDetails.minutes}`;
                            }
                            return <div><span>{dayOfMonth}</span><br /><span>{formattedTime}</span></div>;
                        }}
                    />
                </div>
                <div>
                    <button
                        onClick={() => this.props.selectedWeek !== 0 ? this.props.dispatch(postWeek(this.props.selectedWeek, 1, 'approved')) : alert('Please pick a week to process')}
                    >Accept</button>
                    <button
                        onClick={() => this.props.selectedWeek !== 0 ? this.props.dispatch(postWeek(this.props.selectedWeek, 1, 'rejected')) :  alert('Please pick a week to process')}
                    >Reject</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        users: store.apiCallsReducer.users,
        selectedUser: store.apiCallsReducer.selectedUser,
        currentMonth: store.userOperationsReducer.currentMonth,
        currentUser: store.userOperationsReducer.currentUser,
        selectedWeek: store.userOperationsReducer.selectedWeek
    };
};

export default connect(mapStateToProps)(CalendarApp);