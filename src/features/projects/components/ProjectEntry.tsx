import React from "react";
import { Project } from "types/Project";

interface Props {
  project: Project;
}

export default function ProjectEntry(props: Props): React.ReactElement {
  const { project } = props;
  return (
    <div>
      <p>{project.name}</p>
    </div>
  );
}
