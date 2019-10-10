import { useToast } from "common/components/toast/ToastContext";
import { useProjects } from "common/context/ProjectsContext";
import { IsValidProject } from "common/DataCheckers";
import FloqForm from "common/floq/components/FloqForm/FloqForm";
import FloqModal from "common/floq/components/FloqModal/FloqModal";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Project } from "types/Project";
import EditProjectForm, { EditProjectValues } from "./EditProjectForm";

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

  const toast = useToast();

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
      ctxProjects.actions
        .update(project.id, dto)
        .then(res => {
          toast.show("success", `${res.id} oppdatert`);
          history.push("/projects");
        })
        .catch(err => {
          toast.show("error", `Noe gikk galt: ${err}`);
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
