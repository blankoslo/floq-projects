import React from 'react';
import { browserHistory } from 'react-router';

const ProjectRow = (props) => (
  <div
    className='floq-list-row'
    onClick={() => browserHistory.push(`/projects/${props.project.id}`)}
  >
    <b>{props.project.customer.name}:</b> {props.project.name}
  </div>
);

ProjectRow.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default ProjectRow;
