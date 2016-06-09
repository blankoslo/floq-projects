import React from 'react';
import { browserHistory } from 'react-router';

const ProjectRow = (props) => (
  <div
    className='mdl-list__item employee-list-row'
    onClick={() => browserHistory.push(`/projects/${props.project.id}`)}
  >
    <span className='mdl-list__item-primary-content'>
      <span><b>{props.project.customer.name}:</b> {props.project.name}</span>
      <div className='mdl-layout-spacer'></div>
      <img
        className='employee-list-image'
        src={'https://www.gravatar.com/avatar/placeholder'}
        alt={props.project.name}
      />
    </span>
  </div>
);

ProjectRow.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default ProjectRow;
