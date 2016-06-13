import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from '../components/project';
import { updateProject, createProject, fetchCustomers, selectProject } from '../actions/index';
import selectedProjectSelector from '../selectors/selectedProject';

class ProjectContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillReceiveProps(props) {
    // monitor `id` parameter to keep selected employee in sync
    if (props.params.id !== undefined) {
      const selectedId = parseInt(props.params.id);
      this.props.selectProject(selectedId);
    } else {
      this.props.selectProject(null);
    }
  }


  onProjectUpdate = (data) => {
    if (this.props.project.data === null) {
      this.props.createProject(data)
        .then(p => this.context.router.push(`/projects/${p.payload.data.id}`));
    } else {
      this.props.updateProject(this.props.project.data.id, data)
        .then(() => this.context.router.push(`/projects/${this.props.project.data.id}`));
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
  customers: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  fetchCustomers: React.PropTypes.func,
  createProject: React.PropTypes.func,
  updateProject: React.PropTypes.func,
  selectProject: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  project: selectedProjectSelector(state),
  customers: state.customers
});

export default connect(mapStateToProps, {
  fetchCustomers,
  createProject,
  updateProject,
  selectProject
})(ProjectContainer);
