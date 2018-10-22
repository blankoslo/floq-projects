import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectsList from '../components/projectslist';
import { fetchProjects, fetchCustomers } from '../actions/index';
import projectsSelector from '../selectors/projects';

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
        <ProjectsList projects={this.props.projects} />
        <div className='floq-details'>
            {children}
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
  fetchCustomers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
  customers: state.customers
});

const mapDispatchToProps = {
  fetchProjects,
  fetchCustomers
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
