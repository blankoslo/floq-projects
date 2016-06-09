import * as _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from '../components/project';
import { fetchProject, updateProject, createProject, fetchCustomers } from '../actions/index';

// FIXME: temporary workaround. http requests end up in infinite loop here.
let oldPropsId = undefined;

class ProjectContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillReceiveProps(props) {
    if (props.params.id !== undefined && oldPropsId !== props.params.id) {
      oldPropsId = props.params.id;
      const selectedId = parseInt(props.params.id);
      props.fetchProject(selectedId);
    }
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
