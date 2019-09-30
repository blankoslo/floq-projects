import { CustomersContextProvider } from "common/context/CustomersContext";
import { EmployeesContextProvider } from "common/context/EmployeesContext";
import { ProjectsContextProvider } from "common/context/ProjectsContext";
import "features/projects/styles/projects.scss";
import React from "react";
import { RouteComponentProps } from "react-router";
import ProjectsList from "../components/ProjectsList";

type AllProps = RouteComponentProps;

const ProjectsOverview: React.FC<AllProps> = (props: AllProps) => {
  return (
    <EmployeesContextProvider>
      <CustomersContextProvider>
        <ProjectsContextProvider>
          <ProjectsList />
        </ProjectsContextProvider>
      </CustomersContextProvider>
    </EmployeesContextProvider>
  );
};

export default ProjectsOverview;
