import React from 'react';
import { Route, Router } from 'react-router';

import ProjectsListContainer from './containers/projectslistcontainer';
import ProjectContainer from './containers/projectcontainer';


export default (
  <Router>
    <Route path='/projects' component={ProjectsListContainer} />
    <Route path='/projects/:id' component={ProjectContainer} />
    <Route path='/projects/new' component={ProjectContainer} />
  </Router>
);
