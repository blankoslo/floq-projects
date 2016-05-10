import React, { Component } from 'react';
import ProjectList from '../components/projectlist.js';
import { connect } from 'react-redux';

import { fetchProjects } from '../actions/index';

class ProjectContainer extends Component {
  componentWillMount() {
    this.props.dispatch(fetchProjects());
  }

  render() {
    return <ProjectList projects={this.props.projects} />;
  }
}

ProjectContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  projects: React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  projects: state.projects // state.projects
});

export default connect(mapStateToProps)(ProjectContainer);
