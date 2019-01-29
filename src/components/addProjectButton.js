import React from 'react';
import { browserHistory } from 'react-router';

const AddProjectButton = (props) => (
    <button
        onClick={() => browserHistory.push('/projects/new')}
        id='add-employee-button'
        className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab new-project-button'
    >
        <i className='material-icons dark-gray'>add</i>
    </button>
)

export default AddProjectButton;