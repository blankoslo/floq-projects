import * as React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

const ProjectRow = props => (
  <div
    className='floq-list-row'
    tabIndex='0'
    role='option'
    onClick={() => browserHistory.push(`/projects/${props.project.id}`)}
  >
    <b>
      {props.project.customer.name}
      :
    </b>
    {' '}
    {props.project.name}
  </div>
);

ProjectRow.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectRow;
