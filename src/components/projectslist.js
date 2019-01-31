import * as React from 'react';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import ProjectRow from './projectrow';


const ProjectsList = ({ projects, excludeInactiveProjects, toggleShowInactiveProjects }) => {
  if (projects.loading === true) {
    return <div>Loading</div>;
  }

  const projectsRows = projects.data.valueSeq().map(project => <ProjectRow key={project.id} project={project} />);

  return (
    <div className='floq-list'>
      <div className='floq-list-header'>
        <h3>Prosjekter</h3>
        <div className='floq-inactive-projects-toggle'>
          <Toggle
            label='Vis inaktive'
            defaultToggled={!excludeInactiveProjects}
            onToggle={toggleShowInactiveProjects}
          />
        </div>
      </div>
      <div className='projectRows'>
        {projectsRows}
      </div>
    </div>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.object.isRequired,
  toggleShowInactiveProjects: PropTypes.func.isRequired,
  excludeInactiveProjects: PropTypes.bool
};

export default ProjectsList;
