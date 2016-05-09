import React, { Component } from 'react';
import ProjectList from '../components/projectlist.js';
import { connect } from 'react-redux';

class ProjectContainer extends Component {
  render() {
    return <ProjectList projects={this.props.projects} />;
  }
}

const mapStateToProps = (state) => ({
  projects: [] // state.projects
});

export default connect(mapStateToProps)(ProjectContainer);
