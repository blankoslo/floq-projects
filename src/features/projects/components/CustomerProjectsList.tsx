import React from "react";
import ProjectEntry from "./ProjectEntry";
import { Customer } from "types/Customer";
import { Project } from "types/Project";

interface CustomerProjectsListProps {
  customer: Customer;
  projects: Project[];
}

export default function CustomerProjectsList(
  props: CustomerProjectsListProps
): React.ReactElement {
  const { customer, projects } = props;
  return (
    <div>
      <h2>{customer.name}</h2>
      {projects.map(p => (
        <ProjectEntry key={`project-${p.id}`} project={p} />
      ))}
    </div>
  );
}
