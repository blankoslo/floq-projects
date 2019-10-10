import { useToast } from "common/components/toast/ToastContext";
import { useProjects } from "common/context/ProjectsContext";
import FloqButton from "common/floq/components/FloqButton/FloqButton";
import FloqForm from "common/floq/components/FloqForm/FloqForm";
import FloqFormControl from "common/floq/components/FloqFormControl/FloqFormControl";
import FloqModal from "common/floq/components/FloqModal/FloqModal";
import FloqModalActions from "common/floq/components/FloqModal/FloqModalActions";
import flex from "common/styles/flex.module.scss";
import React, { useState } from "react";
import { Project } from "types/Project";
import styles from "../styles/dialog.module.scss";
import SDGList from "./SDGList";

interface Props {
  projectId: Project["id"];
}

const SDGDialog: React.FC<Props> = (props: Props) => {
  const { projectId } = props;

  const [isOpen, setOpen] = useState<boolean>(true);
  const onClose = (): void => setOpen(false);

  const ctxProjects = useProjects();
  const project = ctxProjects.data.find(p => p.id === projectId);

  const toast = useToast();

  const [selected, setSelected] = useState<number[]>([]);
  const onSelect = (id: number, checked: boolean): void => {
    if (checked) {
      setSelected([...selected, id].sort((a, b) => a - b));
    } else {
      setSelected(selected.filter(s => s !== id).sort((a, b) => a - b));
    }
  };

  const onSubmit = (): void => {
    toast.show("success", selected.toString());
  };

  if (!project) {
    return null;
  }

  return (
    <FloqModal open={isOpen} onClose={onClose} title={project.name}>
      <p>Velg bærekraftsmålene prosjektet bidrar til</p>
      <div className={flex.row}>
        <div className={`${flex.column} ${styles.select}`}>
          <FloqForm>
            <FloqFormControl size="large">
              <SDGList selected={selected} onSelect={onSelect} />
            </FloqFormControl>
            <p>
              <a href="https://www.fn.no/Om-FN/FNs-baerekraftsmaal">
                Les mer om FNs bærekraftsmål
              </a>
            </p>
          </FloqForm>
        </div>
        <div className={`${flex.column} ${styles.tiles}`}>
          <div className={flex.row}>
            {selected.map(s => (
              <img key={`img-${s}`} src={require(`../icons/${s}.jpg`)} />
            ))}
          </div>
        </div>
      </div>
      <FloqModalActions>
        <FloqButton fullWidth action onClick={onClose} type="button">
          Avbryt
        </FloqButton>
        <FloqButton
          fullWidth
          action
          variant="yellow"
          onClick={onSubmit}
          type="button">
          Lagre
        </FloqButton>
      </FloqModalActions>
    </FloqModal>
  );
};

export default SDGDialog;
