import React from 'react';
import { browserHistory } from 'react-router';
import ProjectRow from './projectrow';


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
          className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
        >
          <i className='material-icons dark-gray'>add</i>
        </button>
      </div>
      {projectsRows}
    </div>
  );
};

ProjectsList.propTypes = {
  projects: React.PropTypes.object.isRequired
};

export default ProjectsList;
