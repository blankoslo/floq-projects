import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from '../components/project';
import { fetchProject, updateProject, fetchCustomers } from '../actions/index';

class ProjectContainer extends Component {
  constructor(props) {
    super(props);

    const id = this.props.params.id;

    this.props.dispatch(fetchProject(id));
    this.props.dispatch(fetchCustomers());
  }

  onProjectUpdate = (data) =>
    this.props.dispatch(updateProject(this.props.project.id, data));

  render() {
    return (
      <Project
        project={this.props.project}
        customers={this.props.customers}
        onProjectUpdate={this.onProjectUpdate}
      />
    );
  }
}

ProjectContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  project: React.PropTypes.object.isRequired,
  customers: React.PropTypes.array.isRequired,
  params: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  project: state.project,
  customers: state.customers
});

export default connect(mapStateToProps)(ProjectContainer);
