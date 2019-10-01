import { ProjectAPI } from "common/api/ProjectAPI";
import React, { useContext, useEffect, useState } from "react";
import { Project } from "types/Project";

interface Props {
  children?: React.ReactNode;
}

interface ProjectContextProps {
  data: Project[];
  actions: {
    create: (dto: Project) => Promise<Project>;
    update: (id: Project["id"], dto: Project) => Promise<Project>;
  };
}

const ProjectsContext = React.createContext<ProjectContextProps>({
  data: [],
  actions: {
    create: (): Promise<Project> => Promise.reject(),
    update: (): Promise<Project> => Promise.reject(),
  },
});
export default ProjectsContext;

export const ProjectsContextProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const [projects, setProjects] = useState<Project[]>([]);

  const getAllProjects = (): Promise<Project[]> => {
    return ProjectAPI.getAll().then(res => {
      setProjects(res);
      return res;
    });
  };

  const createProject = (dto: Project): Promise<Project> => {
    return ProjectAPI.create(dto).then(res => {
      setProjects([...projects, dto]);
      return res;
    });
  };

  const updateProject = (id: Project["id"], dto: Project): Promise<Project> => {
    return ProjectAPI.update(id, dto).then(res => {
      setProjects(
        projects.map(p => {
          if (p.id === id) {
            return dto;
          }
          return p;
        })
      );
      return res;
    });
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
        },
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectContextProps =>
  useContext(ProjectsContext);
