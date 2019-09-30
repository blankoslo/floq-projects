import React from "react";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import ProjectEntry from "./ProjectEntry";

interface Props {
  customer: Customer;
  projects: Project[];
}

const CustomerProjectsList: React.FC<Props> = (props: Props) => {
  const { customer, projects } = props;
  return (
    <div className="customer">
      <span className="customer-name">{customer.name}</span>
      {projects.map(p => (
        <ProjectEntry key={`project-${p.id}`} project={p} />
      ))}
    </div>
  );
};

export default CustomerProjectsList;
