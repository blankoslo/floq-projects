import React from 'react';
import { browserHistory } from 'react-router';

const ProjectRow = (props) => (
  <div
    className='mdl-list__item employee-list-row'
    onClick={() => browserHistory.push(`/projects/${props.project.id}`)}
  >
    <span className='mdl-list__item-primary-content'>
      <span><b>{props.project.customer.name}:</b> {props.project.name}</span>
    </span>
  </div>
);

ProjectRow.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default ProjectRow;
