import React from 'react';

const Project = (props) => {
  if (props.project === {}) {
    return <p>...loading</p>;
  }

  return <p>{props.project.name}</p>;
};

Project.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default Project;
