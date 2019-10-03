import FloqModal from "common/floq/components/FloqModal/FloqModal";
import React, { useState } from "react";
import { useHistory } from "react-router";
import NewProjectForm from "./NewProjectForm";
import { IsValidProject } from "common/DataCheckers";
import { useProjects } from "common/context/ProjectsContext";

const NewProjectDialog: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(true);

  const history = useHistory();

  const onClose = (): void => {
    setOpen(false);
    history.push("/projects");
  };

  const ctxProjects = useProjects();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any): void => {
    // TODO: Implement this in database
    delete values.subcontractor;
    const project = { ...values, active: true };
    if (IsValidProject(project)) {
      ctxProjects.actions.create(project).then(() => {
        history.push("/projects");
      });
    }
  };

  return (
    <FloqModal open={isOpen} onClose={onClose} title="Legg til prosjekt">
      <NewProjectForm onCancel={onClose} onSubmit={onSubmit} />
    </FloqModal>
  );
};

export default NewProjectDialog;
