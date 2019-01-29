import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectsList from '../components/projectslist';
import { fetchProjects, fetchCustomers, toggleShowInactiveProjects } from '../actions/index';
import projectsSelector from '../selectors/projects';
import AddProjectButton from '../components/addProjectButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.fetchProjects();
    this.props.fetchCustomers();
  }

  render() {
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        projects: this.props.projects,
        customers: this.props.customers
      }));

    return (
      <div className='floq-app-projects floq-list-and-details'>
        <ProjectsList projects={this.props.projects} excludeInactiveProjects={this.props.excludeInactiveProjects} toggleShowInactiveProjects={this.props.toggleShowInactiveProjects} />
        <div className='floq-details'>
          {children}
          <AddProjectButton />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  params: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  children: PropTypes.object,
  customers: PropTypes.object.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
  toggleShowInactiveProjects: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  console.log(state)
  return ({
    projects: projectsSelector(state),
    excludeInactiveProjects: state.projects.excludeInactiveProjects,
    customers: state.customers,
  })
};

const mapDispatchToProps = {
  fetchProjects,
  fetchCustomers,
  toggleShowInactiveProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
