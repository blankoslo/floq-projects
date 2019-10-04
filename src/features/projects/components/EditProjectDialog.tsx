import { useProjects } from "common/context/ProjectsContext";
import { IsValidProject } from "common/DataCheckers";
import FloqModal from "common/floq/components/FloqModal/FloqModal";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Project } from "types/Project";
import EditProjectForm, { EditProjectValues } from "./EditProjectForm";
import FloqForm from "common/floq/components/FloqForm/FloqForm";

interface Props {
  projectId: Project["id"];
}

const EditProjectDialog: React.FC<Props> = (props: Props) => {
  const { projectId } = props;

  const [isOpen, setOpen] = useState<boolean>(true);

  const history = useHistory();

  const onClose = (): void => {
    setOpen(false);
    history.push("/projects");
  };

  const ctxProjects = useProjects();
  const project = ctxProjects.data.find(p => p.id === projectId);

  if (!project) {
    return (
      <FloqModal
        open
        onClose={(): void => {
          history.push("/projects");
        }}
        title="Rediger prosjekt">
        <FloqForm>Laster...</FloqForm>
      </FloqModal>
    );
  }

  const onSubmit = (values: EditProjectValues): void => {
    // TODO: Implement this in database
    delete values.subcontractor;

    const dto = { ...project, ...values };
    if (IsValidProject(dto)) {
      ctxProjects.actions.update(project.id, dto).then(() => {
        history.push("/projects");
      });
    }
  };

  return (
    <FloqModal open={isOpen} onClose={onClose} title="Rediger prosjekt">
      <EditProjectForm
        project={project}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </FloqModal>
  );
};

export default EditProjectDialog;
