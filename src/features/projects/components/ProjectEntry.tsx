import React, { useState } from "react";
import { Project } from "types/Project";
import EditProjectDialog from "./EditProjectDialog";

interface Props {
  project: Project;
}

const ProjectEntry: React.FC<Props> = (props: Props) => {
  const { project } = props;
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpen = (): void => {
    setOpen(true);
  };

  const onClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <div className="project" onClick={onOpen}>
        <span className="name">{project.name}</span>
        <span className="code">{project.id}</span>
      </div>
      <EditProjectDialog
        projectId={project.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ProjectEntry;
