import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    const listClasses = this.props.children === null
                      ? 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet'
                      : 'mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--hide-phone';

    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        projects: this.props.projects,
        customers: this.props.customers
      }));

    return (
      <div className='mdl-grid'>
        <div className={listClasses}>
          <ProjectsList projects={this.props.projects} />
        </div>
        <div
          id='detail'
          className='mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet'
          style={{ position: 'fixed' }}
        >
          <div className='detail-view'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired,
  projects: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,
  customers: React.PropTypes.object.isRequired,
  fetchProjects: React.PropTypes.func.isRequired,
  fetchCustomers: React.PropTypes.func.isRequired
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
