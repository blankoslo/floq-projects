import React from 'react';
import { Route, Router } from 'react-router';

const ProjectList = (props) =>
  <div>
    <p>
      Prosjektliste
    </p>
    {props.children}
  </div>;

ProjectList.propTypes = {
  children: React.PropTypes.array.isRequired
};

const ProjectEditor = () =>
  <div>
    <p>
      Projeskteditor
    </p>
  </div>;

export default (
  <Router>
    <Route path='/projects' component={ProjectList}>
      <Route path=':id' component={ProjectEditor} />
      <Route path='new' component={ProjectEditor} />
    </Route>
  </Router>
);
