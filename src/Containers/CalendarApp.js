import React, { Component } from 'react';
import { connect } from 'react-redux';

import {fetchUsers, fetchUser, postWeek } from '../Actions/calendarApp_actions';

class CalendarApp extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.dispatch(fetchUsers());
    }
    render(){
        return(
        <div>
            <select>
                {this.props.users.map(user => {
                    return (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    )
                })}
            </select>
        </div>
        )}
};

const mapStateToProps = function(store){
    return {
        users: store.calendarAppReducer.users,
        selectedMonth: store.calendarAppReducer.selectedUser
    };
};

export default connect(mapStateToProps)(CalendarApp);