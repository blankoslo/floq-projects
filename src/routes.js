import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import ProjectContainer from './containers/projectcontainer';
import ProjectEditor from './components/projectEditor';

export default (
  <Route path='/projects' component={App}>
    <Route path='new' component={ProjectContainer}>
      <IndexRoute component={ProjectEditor} />
    </Route>
    <Route path=':id' component={ProjectContainer}>
      <IndexRoute component={ProjectEditor} />
    </Route>
  </Route>
);
