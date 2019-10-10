import React from "react";
import { Link } from "react-router-dom";
import { Project } from "types/Project";
import styles from "../styles/column.module.scss";

interface Props {
  projectId: Project["id"];
  goals: number[];
}

const SDGColumn: React.FC<Props> = (props: Props) => {
  const { projectId, goals } = props;

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
