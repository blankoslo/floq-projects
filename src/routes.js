import React from 'react';
import { Route, Router } from 'react-router';

import ProjectContainer from './containers/projectcontainer.js';

const ProjectEditor = () =>
  <div>
    <p>
      Projeskteditor
    </p>
  </div>;


export default (
  <Router>
    <Route path='/projects' component={ProjectContainer}>
      <Route path=':id' component={ProjectEditor} />
      <Route path='new' component={ProjectEditor} />
    </Route>
  </Router>
);
