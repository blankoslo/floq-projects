import React from 'react';

const ProjectList = (props) => {
  const listEntries = props.projects.map(p =>
    <li key={p.id}>
      <b>{p.customer.name}:</b> {p.name}
    </li>);
  return (<div>
    <ul>
      {listEntries}
    </ul>
  </div>);
};

ProjectList.propTypes = {
  projects: React.PropTypes.array.isRequired
};

export default ProjectList;
