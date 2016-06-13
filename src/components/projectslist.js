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
    <div>
      <div className='mdl-list'>
        <div className='employee-list-header'>
          <div>
            <h3>Prosjekter</h3>
          </div>
          <button
            onClick={() => browserHistory.push('/projects/new')}
            id='add-employee-button'
            className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
          >
            <i className='material-icons dark-gray'>add</i>
          </button>
        </div>
        <hr />
        <div className='vert-spacer' />
        {projectsRows}
      </div>
    </div>
  );
};

ProjectsList.propTypes = {
  projects: React.PropTypes.object.isRequired
};

export default ProjectsList;
