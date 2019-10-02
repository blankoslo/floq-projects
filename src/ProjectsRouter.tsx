import { CustomersContextProvider } from "common/context/CustomersContext";
import { EmployeesContextProvider } from "common/context/EmployeesContext";
import { ProjectsContextProvider } from "common/context/ProjectsContext";
import EditProjectDialog from "features/projects/components/EditProjectDialog";
import NewProjectDialog from "features/projects/components/NewProjectDialog";
import ProjectsList from "features/projects/components/ProjectsList";
import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";

const WrapContext: React.FC<{ children: React.ReactNode }> = (props: {
  children: React.ReactNode;
}) => {
  return (
    <EmployeesContextProvider>
      <CustomersContextProvider>
        <ProjectsContextProvider>{props.children}</ProjectsContextProvider>
      </CustomersContextProvider>
    </EmployeesContextProvider>
  );
};

const ProjectsRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/projects/">
          <WrapContext>
            <ProjectsList />
            <Switch>
              <Route path="/projects/new" component={NewProjectDialog} />
              <Route
                path="/projects/:id"
                render={(
                  props: RouteComponentProps<{ id: string }>
                ): React.ReactNode => (
                  <EditProjectDialog projectId={props.match.params.id} />
                )}
              />
            </Switch>
          </WrapContext>
        </Route>
        <Redirect to="/projects" />
      </Switch>
    </BrowserRouter>
  );
};
export default ProjectsRouter;
