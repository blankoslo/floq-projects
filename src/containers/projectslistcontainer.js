import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectsList from '../components/projectslist';
import { fetchProjects } from '../actions/index';

class ProjectsListContainer extends Component {
  constructor(props) {    // props kommer fra Redux? Er det slik at props == Redux store?
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
  projects: state.projects // state.projects
});

/*
  Connects the Redux store to the React component ProjectsListContainer.
*/
export default connect(mapStateToProps)(ProjectsListContainer);
