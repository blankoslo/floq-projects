import React from "react";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import ProjectEntry from "./ProjectEntry";
import { useHistory } from "react-router";
import styles from "features/projects/styles/customer.module.scss";

interface Props {
  customer: Customer;
  projects: Project[];
}

const CustomerProjectsList: React.FC<Props> = (props: Props) => {
  const { customer, projects } = props;
  const history = useHistory();
  return (
    <div className={styles.customer}>
      <div className={styles.heading}>
        <span className={styles.name}>{customer.name}</span>
        <i
          className={`${styles.action} material-icons`}
          onClick={(): void => {
            history.push(`/projects/new?existing-customer=${customer.id}`);
          }}>
          add
        </i>
      </div>

      {projects.map(p => (
        <ProjectEntry key={`project-${p.id}`} project={p} />
      ))}
    </div>
  );
};

export default CustomerProjectsList;
