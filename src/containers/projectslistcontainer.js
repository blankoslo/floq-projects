import React, { Component } from 'react';
import ProjectsList from '../components/projectslist.js';
import { connect } from 'react-redux';

import { fetchProjects } from '../actions/index';

class ProjectsListContainer extends Component {
  componentWillMount() {
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
  projects: state.projects // state.projects
});

export default connect(mapStateToProps)(ProjectsListContainer);
