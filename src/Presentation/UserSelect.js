import React from 'react';
import PropTypes from 'prop-types';

import './UserSelect.css';

const UserSelect = (props) => (
    <div>
        <select className='userSelect' onChange={(event) => props.onChange(event.target.value)}>
            {props.users.map(user => {
                return (
                    <option key={user.id} value={user.id}>{user.username}</option>
                );
            })}
        </select>
    </div>
);

UserSelect.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default UserSelect;