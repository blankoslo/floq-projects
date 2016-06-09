import React from 'react';
import { Route } from 'react-router';

import App from './containers/app';
import ProjectContainer from './containers/projectcontainer';

export default (
  <Route path='/projects' component={App} >
    <Route path='new' component={ProjectContainer} />
    <Route path=':id' component={ProjectContainer} />
  </Route>
);
