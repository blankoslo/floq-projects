import { ProjectAPI } from "common/api/ProjectAPI";
import React, { useContext, useEffect, useState } from "react";
import { Project } from "types/Project";

interface Props {
  children?: React.ReactNode;
}

interface ProjectContextProps {
  data: Project[];
  actions: {
    create: (dto: Project) => void;
    update: (id: Project["id"], dto: Project) => void;
    delete: (id: Project["id"]) => void;
  };
}

const ProjectsContext = React.createContext<ProjectContextProps>({
  data: [],
  actions: {
    create: (dto: Project): void => {},
    update: (id: Project["id"], dto: Project): void => {},
    delete: (id: Project["id"]): void => {},
  },
});
export default ProjectsContext;

export const ProjectsContextProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const [projects, setProjects] = useState<Project[]>([]);

  const getAllProjects = (): void => {
    ProjectAPI.getAll().then(res => setProjects(res));
  };

  const createProject = (dto: Project): void => {
    setProjects([...projects, dto]);
  };

  const updateProject = (id: Project["id"], dto: Project): void => {
    setProjects(
      projects.map(p => {
        if (p.id === id) {
          return dto;
        }
        return p;
      })
    );
  };

  const deleteProject = (id: Project["id"]): void => {
    setProjects(projects.filter(p => p.id !== id));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        data: projects,
        actions: {
          create: createProject,
          update: updateProject,
          delete: deleteProject,
        },
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectContextProps =>
  useContext(ProjectsContext);
