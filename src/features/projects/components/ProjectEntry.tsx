import styles from "features/projects/styles/project.module.scss";
import React from "react";
import { useHistory } from "react-router";
import { Project } from "types/Project";

interface Props {
  project: Project;
}

const ProjectEntry: React.FC<Props> = (props: Props) => {
  const { project } = props;
  const history = useHistory();

  return (
    <>
      <div
        className={styles.project}
        onClick={(): void => history.push(`/projects/${project.id}`)}>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.code}>{project.id}</span>
      </div>
    </>
  );
};

export default ProjectEntry;
