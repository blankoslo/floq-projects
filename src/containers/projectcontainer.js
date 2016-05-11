import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from '../components/project';
import { fetchProject, updateProject } from '../actions/index';

class ProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.onProjectUpdate = this.onProjectUpdate.bind(this);
  }
  componentWillMount() {
    const id = this.props.params.id;
    this.props.dispatch(fetchProject(id));
  }

  onProjectUpdate(data) {
    this.props.dispatch(updateProject(this.props.project.id, data));
  }

  render() {
    return <Project project={this.props.project} onProjectUpdate={this.onProjectUpdate} />;
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
