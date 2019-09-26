import React, { useState, useEffect } from "react";
import { Projects } from "../../../types/Project";
import { ProjectAPI } from "../../../common/api/ProjectAPI";

export default function ProjectsList(): React.ReactElement {
  const [projects, setProjects] = useState<Projects>([]);

  const getAllProjects = (): void => {
    ProjectAPI.getAll().then(res => setProjects(res));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      {projects.map(p => (
        <div key={`project-${p.id}`}>
          <span>{p.name}</span>
        </div>
      ))}
    </div>
  );
}
