import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectsList from '../components/projectslist';
import { fetchProjects } from '../actions/index';

class ProjectsListContainer extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(fetchProjects());
  }

  render() {
    return <ProjectsList projects={this.props.projects} />;
  }
}

ProjectsListContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  projects: React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  projects: state.projects
});

export default connect(mapStateToProps)(ProjectsListContainer);
