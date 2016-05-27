import React from 'react';
import { Link } from 'react-router';

const ProjectsList = (props) => {
  const listEntries = props.projects.map(p =>
    <li key={p.id}>
      <Link to={`/projects/${p.id}`}><b>{p.customer.name}:</b> {p.name}</Link>
    </li>);

  return (
    <div>
      <Link to={'/projects/new'}>New project</Link>
      <ul>
        {listEntries}
      </ul>
    </div>
  );
};

ProjectsList.propTypes = {
  projects: React.PropTypes.array.isRequired
};

export default ProjectsList;
