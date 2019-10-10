import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "types/Project";
import styles from "../styles/column.module.scss";
import { useProjects } from "common/context/ProjectsContext";
import { ProjectAPI } from "common/api/ProjectAPI";
import { getSDGAggregate } from "common/utils/SDGAggregator";

interface Props {
  projectId: Project["id"];
}

const SDGColumn: React.FC<Props> = (props: Props) => {
  const { projectId } = props;

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
      <div className={styles.column}>
        <div className={styles.tiles}>
          {goals.map(s => (
            <img key={`img-${s}`} src={require(`../icons/${s}.jpg`)} />
          ))}
        </div>
        <Link to={`/projects/sdg/${projectId}`}>Endre bærekraftsmål</Link>
      </div>
    );
  }
  return (
    <div className={styles.column}>
      <Link to={`/projects/sdg/${projectId}`}>Legg til bærekraftsmål</Link>
    </div>
  );
};

export default SDGColumn;
