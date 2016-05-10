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

ProjectContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  project: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps)(ProjectContainer);
