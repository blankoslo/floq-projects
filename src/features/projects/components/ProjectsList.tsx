import React, { useState, useEffect } from "react";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import { CustomerAPI } from "common/api/CustomerAPI";
import { ProjectAPI } from "common/api/ProjectAPI";
import CustomerProjectsList from "./CustomerProjectsList";

interface CustomerProjects {
  customer: Customer;
  projects: Project[];
}

export default function ProjectsList(): React.ReactElement {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const getAllCustomers = (): void => {
    CustomerAPI.getAll().then(res => setCustomers(res));
  };

  const getAllProjects = (): void => {
    ProjectAPI.getAll().then(res => setProjects(res));
  };

  useEffect(() => {
    getAllCustomers();
    getAllProjects();
  }, []);

  const [customerProjects, setCustomerProjects] = useState<CustomerProjects[]>(
    []
  );

  useEffect(() => {
    setCustomerProjects(
      customers.map(c => ({
        customer: c,
        projects: projects.filter(p => p.customer === c.id),
      }))
    );
  }, [customers, projects]);

  return (
    <div>
      {customerProjects.map(c => (
        <CustomerProjectsList
          key={`customer-${c.customer.id}`}
          customer={c.customer}
          projects={c.projects}
        />
      ))}
    </div>
  );
}
