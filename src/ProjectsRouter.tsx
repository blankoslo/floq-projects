import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import ProjectsOverview from "./features/projects/views/ProjectsOverview";

export default function ProjectsRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/projects/" component={ProjectsOverview} />
        <Route path="/projects/:id" component={ProjectsOverview} />
        <Route path="/projects/new" component={ProjectsOverview} />
        <Redirect to="/projects" />
      </Switch>
    </BrowserRouter>
  );
}
