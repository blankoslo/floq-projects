import { useCustomers } from "common/context/CustomersContext";
import { useProjects } from "common/context/ProjectsContext";
import React, { useEffect, useState } from "react";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import CustomerProjectsList from "./CustomerProjectsList";

interface CustomerProjects {
  customer: Customer;
  projects: Project[];
}

const ProjectsList: React.FC = () => {
  const ctxCustomers = useCustomers();
  const ctxProjects = useProjects();

  const [filteredProjects, setFilteredProjects] = useState<CustomerProjects[]>(
    []
  );

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const lcSearch = search.toLowerCase();

    const filteredProjects = ctxProjects.data.filter(p => {
      const c = ctxCustomers.data.find(c => c.id === p.customer);
      if (
        c &&
        (c.id.toLowerCase().includes(lcSearch) ||
          c.name.toLowerCase().includes(lcSearch))
      ) {
        return true;
      }
      if (
        p.id.toLowerCase().includes(lcSearch) ||
        p.name.toLowerCase().includes(lcSearch)
      ) {
        return true;
      }
      return false;
    });
    setFilteredProjects(
      ctxCustomers.data
        .map(c => ({
          customer: c,
          projects: filteredProjects
            .filter(p => p.customer === c.id)
            .sort((a, b) => {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            }),
        }))
        .filter(cp => cp.projects.length > 0)
        .sort((a, b) => {
          if (a.customer.name < b.customer.name) return -1;
          if (a.customer.name > b.customer.name) return 1;
          return 0;
        })
    );
  }, [search, ctxCustomers.data, ctxProjects.data]);

  return (
    <div className="overview">
      <input
        type="text"
        name="search"
        placeholder="Søk"
        onChange={e => setSearch(e.currentTarget.value)}
      />
      <div className="projects">
        {filteredProjects.map(c => (
          <CustomerProjectsList
            key={`customer-${c.customer.id}`}
            customer={c.customer}
            projects={c.projects}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
