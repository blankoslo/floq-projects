/* eslint-disable @typescript-eslint/camelcase */
import { useToast } from "common/components/toast/ToastContext";
import { useProjects } from "common/context/ProjectsContext";
import FloqButton from "common/floq/components/FloqButton/FloqButton";
import FloqForm from "common/floq/components/FloqForm/FloqForm";
import FloqFormControl from "common/floq/components/FloqFormControl/FloqFormControl";
import FloqModal from "common/floq/components/FloqModal/FloqModal";
import FloqModalActions from "common/floq/components/FloqModal/FloqModalActions";
import flex from "common/styles/flex.module.scss";
import React, { useState, useEffect } from "react";
import { Project } from "types/Project";
import { SDGEvent } from "types/SDGEvent";
import styles from "../styles/dialog.module.scss";
import SDGList from "./SDGList";
import { ProjectAPI } from "common/api/ProjectAPI";
import { getSDGAggregate, diffSDGStates } from "common/utils/SDGAggregator";
import { useEmployees } from "common/context/EmployeesContext";
import Config from "common/Config";

interface Props {
  projectId: Project["id"];
}

const SDGDialog: React.FC<Props> = (props: Props) => {
  const { projectId } = props;

  const [isOpen, setOpen] = useState<boolean>(true);
  const onClose = (): void => setOpen(false);

  const ctxEmployees = useEmployees();
  const curEmployee = ctxEmployees.data.find(e => e.email === Config.userEmail);

  const ctxProjects = useProjects();
  const project = ctxProjects.data.find(p => p.id === projectId);

  const toast = useToast();

  const [goalState, setGoalState] = useState<number[]>([]);
  const [newGoalState, setNewGoalState] = useState<number[]>([]);

  useEffect(() => {
    if (!project) return;
    ProjectAPI.getSDGEvents(project.id).then(res => {
      const agg = getSDGAggregate(res);
      setGoalState(agg);
      setNewGoalState(agg);
    });
  }, [project]);

  const onSelect = (id: number, checked: boolean): void => {
    if (checked) {
      setNewGoalState([...newGoalState, id].sort((a, b) => a - b));
    } else {
      setNewGoalState(newGoalState.filter(s => s !== id).sort((a, b) => a - b));
    }
  };

  if (!project || !curEmployee) {
    return null;
  }

  const onSubmit = (): void => {
    const { ended, added } = diffSDGStates(goalState, newGoalState);
    const events = [
      ...ended.map(
        g =>
          ({
            event_type: "ended",
            caused_by: curEmployee.id,
            project: project.id,
            goal: g,
          } as SDGEvent)
      ),
      ...added.map(
        g =>
          ({
            event_type: "added",
            caused_by: curEmployee.id,
            project: project.id,
            goal: g,
          } as SDGEvent)
      ),
    ];
    ProjectAPI.createSDGEvents(events).then(res => console.log(res));
    toast.show("success", newGoalState.toString());
  };

  return (
    <FloqModal open={isOpen} onClose={onClose} title={project.name}>
      <p>Velg bærekraftsmålene prosjektet bidrar til</p>
      <div className={flex.row}>
        <div className={`${flex.column} ${styles.select}`}>
          <FloqForm>
            <FloqFormControl size="large">
              <SDGList selected={newGoalState} onSelect={onSelect} />
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
            {newGoalState.map(s => (
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
