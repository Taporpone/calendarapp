import React from 'react';
import PropTypes from 'prop-types';

import './Buttons.css';

const Buttons = (props) => (
    <div>
        <button className='button' onClick={() => props.onClick('accept')}>Accept</button>
        <button className='button' onClick={() => props.onClick('reject')}>Reject</button>
    </div>
);

Buttons.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Buttons;