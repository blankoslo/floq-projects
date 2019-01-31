import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  updateProject, createProject,
  selectProject, updateField, resetForm, fetchEmployees
} from '../actions/index';
import selectedProjectSelector from '../selectors/selectedProject';

class ProjectContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    props.fetchEmployees();
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
    const form = this.props.form.data;
    if (form.some(x => x.length < 1)) {
      return;
    }
    // TODO: Use selected_project instead of props.params.id?
    const selectedProjectId = this.props.params.id;
    if (selectedProjectId === undefined) {
      this.props.createProject(form)
        .then(p => this.context.router.push(`/projects/${p.payload.id}`));
    } else {
      this.props.updateProject(selectedProjectId, form);
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
    if (this.props.customers.loading
      || this.props.form.loading
      || this.props.employees.loading) {
      return <p>...loading</p>;
    }
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        customers: this.props.customers,
        employees: this.props.employees.data,
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
  customers: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,

  // mapStateToProps
  form: PropTypes.object.isRequired,
  employees: PropTypes.object.isRequired,

  // mapDispatchToProps
  createProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  fetchEmployees: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    form: selectedProjectSelector(state),
    employees: state.employees,
  }
);

export default connect(mapStateToProps, {
  createProject,
  updateProject,
  selectProject,
  updateField,
  resetForm,
  fetchEmployees,
})(ProjectContainer);
