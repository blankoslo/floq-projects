import * as _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from '../components/project';
import { fetchProject, updateProject, createProject, fetchCustomers } from '../actions/index';

class ProjectContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    const id = this.props.params.id;

    if (id !== undefined) {
      this.props.fetchProject(id);
    }
    this.props.fetchCustomers();
  }

  onProjectUpdate = (data) => {
    if (_.isEmpty(this.props.project)) {
      this.props.createProject(data)
      .then(this.context.router.push('/projects'));
    } else {
      this.props.updateProject(this.props.project.id, data)
      .then(this.context.router.push('/projects'));
    }
  }

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
  project: React.PropTypes.object.isRequired,
  customers: React.PropTypes.array.isRequired,
  params: React.PropTypes.object.isRequired,
  fetchProject: React.PropTypes.func,
  fetchCustomers: React.PropTypes.func,
  createProject: React.PropTypes.func,
  updateProject: React.PropTypes.func
};

const mapStateToProps = (state) => ({
  project: state.project,
  customers: state.customers
});

export default connect(mapStateToProps, {
  fetchProject,
  fetchCustomers,
  createProject,
  updateProject
})(ProjectContainer);
