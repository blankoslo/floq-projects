import { ProjectAPI } from "common/api/ProjectAPI";
import { useProjects } from "common/context/ProjectsContext";
import { getSDGAggregate } from "common/utils/SDGAggregator";
import SDGLogo from "features/sdg/resources/SDG_Wheel.png";
import Arrow from "features/sdg/resources/Arrow.png";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Project } from "types/Project";
import styles from "../styles/column.module.scss";

interface Props {
  projectId: Project["id"];
}

const SDGColumn: React.FC<Props> = (props: Props) => {
  const { projectId } = props;

  const history = useHistory();

  const ctxProjects = useProjects();
  const project = ctxProjects.data.find(p => p.id === projectId);

  const [goals, setGoals] = useState<number[]>([]);

  useEffect(() => {
    if (!project) return;
    ProjectAPI.getSDGEvents(project.id).then(res => {
      const agg = getSDGAggregate(res);
      setGoals(agg);
    });
  }, [project]);

  if (goals.length > 0) {
    return (
      <div
        className={styles.column}
        onClick={(): void => {
          history.push(`/projects/sdg/${projectId}`);
        }}>
        <div className={styles.tiles}>
          {goals.map(s => (
            <img key={`img-${s}`} src={require(`../icons/${s}.jpg`)} />
          ))}
        </div>
        <p>
          Endre
          <br />
          bærekraftsmål
        </p>
        <img className={styles.arrow} src={Arrow} />
      </div>
    );
  }
  return (
    <div
      className={styles.column}
      onClick={(): void => {
        history.push(`/projects/sdg/${projectId}`);
      }}>
      <img className={styles.logo} src={SDGLogo} />
      <p>
        Legg til
        <br />
        bærekraftsmål
      </p>
      <img className={styles.arrow} src={Arrow} />
    </div>
  );
};

export default SDGColumn;
