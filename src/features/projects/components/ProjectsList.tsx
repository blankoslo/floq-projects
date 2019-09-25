import React, { useState, useEffect } from "react";
import { Projects } from "../../../types/project";
import { ProjectAPI } from "../../../common/api/ProjectAPI";

export default function ProjectsList(): React.ReactElement {
  const [projects, setProjects] = useState<Projects>([]);
  useEffect(() => {
    ProjectAPI.getAll().then(res => setProjects(res));
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
