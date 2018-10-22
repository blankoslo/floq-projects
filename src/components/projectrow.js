import * as React from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
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
  project: PropTypes.object.isRequired
};

export default ProjectRow;
