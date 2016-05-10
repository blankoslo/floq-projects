import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from '../components/project';
import { fetchProject } from '../actions/index';

class ProjectContainer extends Component {
  componentWillMount() {
    const id = this.props.params.id;
    this.props.dispatch(fetchProject(id));
  }

  render() {
    return <Project project={this.props.project} />;
  }
}

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps)(ProjectContainer);
