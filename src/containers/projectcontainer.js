import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateProject, createProject,
  selectProject, updateField, resetForm } from '../actions/index';

import selectedProjectSelector from '../selectors/selectedProject';

class ProjectContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    props.resetForm();
    if (props.params.id !== undefined) {
      const selectedId = props.params.id;
      props.selectProject(selectedId);
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.params.id !== props.params.id) {
      // Resetting form when :id changes.
      // Notice: if you reclick the same element in the list, the form won't reset
      props.resetForm();
    }

    if (props.params.id !== undefined) {
      const selectedId = props.params.id;
      this.props.selectProject(selectedId);
    } else {
      this.props.selectProject(null);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.props.form.data;
    // TODO: Use selected_project instead of props.params.id?
    const id = this.props.params.id;
    if (id === undefined) {
      this.props.createProject(data)
        .then(p => this.context.router.push(`/projects/${p.payload.id}`));
    } else {
      this.props.updateProject(id, data);
    }
  }

  onChange = (fieldName, value) => {
    this.props.updateField(fieldName, value);
  }

  generateProjectId = (customerId) => {
    const prefix = this.props.customers.data.get(customerId, { name: customerId }).name
      .substring(0, 3)
      .toUpperCase();

    const nextId = this.props.projects.data.toSeq()
      .filter(project => project.customer.id === customerId)
      .reduce((previousId, currentProject) => {
        const currentNumber = parseInt(currentProject.id.replace(/.*\D/g, ''));
        return currentNumber >= previousId ? currentNumber + 1 : previousId;
      }, 1000);

    return `${prefix}${nextId === undefined ? '' : nextId}`;
  };

  render() {
    const isNew = this.props.params.id === undefined;

    if (this.props.customers.loading === true ||
        this.props.form.loading === true) {
      return <p>...loading</p>;
    }
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        customers: this.props.customers,
        onSubmit: this.onSubmit,
        onChange: this.onChange,
        generateProjectId: this.generateProjectId,
        form: this.props.form,
        isNew
      }));

    return <div className='floq-details-sticky'>{children}</div>;
  }
}

ProjectContainer.propTypes = {
  customers: React.PropTypes.object.isRequired,
  projects: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.object.isRequired,
  createProject: React.PropTypes.func.isRequired,
  updateProject: React.PropTypes.func.isRequired,
  updateField: React.PropTypes.func.isRequired,
  selectProject: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,

  // Internal propTypes
  form: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => (
  {
    form: selectedProjectSelector(state)
  }
);

export default connect(mapStateToProps, {
  createProject,
  updateProject,
  selectProject,
  updateField,
  resetForm
})(ProjectContainer);
