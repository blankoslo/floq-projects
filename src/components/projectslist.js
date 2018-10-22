import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import ProjectRow from './projectrow';
import { browserHistory } from 'react-router';

const ProjectsList = (props) => {
  if (props.projects.loading === true) {
    return <div>Loading</div>;
  }

  const projectsRows = props.projects.data.valueSeq().map(project =>
    <ProjectRow key={project.id} project={project} />
  );

  return (
    <div className='floq-list'>
      <div className='floq-list-header'>
        <h3>Prosjekter</h3>
        <button
          onClick={() => browserHistory.push('/projects/new')}
          id='add-employee-button'
          className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab new-project-button'
        >
          <i className='material-icons dark-gray'>add</i>
        </button>
      </div>
      <div className="projectRows">
        {projectsRows}
      </div>
    </div>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.object.isRequired
};

export default ProjectsList;
