import { useCustomers } from "common/context/CustomersContext";
import { useProjects } from "common/context/ProjectsContext";
import FloqCheckbox from "common/floq/components/FloqCheckbox/FloqCheckbox";
import topbarStyles from "features/projects/styles/topbar.module.scss";
import overviewStyles from "features/projects/styles/overview.module.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import CustomerProjectsList from "./CustomerProjectsList";

interface CustomerProjects {
  customer: Customer;
  projects: Project[];
}

const ProjectsOverview: React.FC = () => {
  const ctxCustomers = useCustomers();
  const ctxProjects = useProjects();

  const [filteredProjects, setFilteredProjects] = useState<CustomerProjects[]>(
    []
  );

  const [filterActive, setFilterActive] = useState<boolean>(true);
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
            .filter(p => (filterActive ? p.active : true))
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
  }, [filterActive, search, ctxCustomers.data, ctxProjects.data]);

  const hasData = ctxProjects.data.length > 0;
  const hasFilteredData = filteredProjects.length > 0;

  const history = useHistory();

  return (
    <div className="overview">
      <div className={topbarStyles.topbar}>
        <button
          className={topbarStyles.addButton}
          onClick={(): void => history.push("/projects/new")}>
          <i className="material-icons dark-gray">add</i>
          <span>Legg til prosjekt</span>
        </button>
        <div className={topbarStyles.searchWrapper}>
          <i className={`${topbarStyles.searchIcon} material-icons dark-gray`}>
            search
          </i>
          <input
            type="text"
            autoFocus
            className={topbarStyles.search}
            placeholder="Søk på navn, tittel, emoji"
            onChange={(e): void => setSearch(e.currentTarget.value)}
          />
        </div>
        <FloqCheckbox
          label="Vis kun aktive prosjekter"
          checked={filterActive}
          onChange={(e): void => setFilterActive(e.target.checked)}
        />
      </div>
      <div className={overviewStyles.projects}>
        {!hasData && <span style={{ fontSize: "32rem" }}>⏳</span>}
        {hasData && !hasFilteredData && (
          <span style={{ fontSize: "32rem" }}>😬</span>
        )}
        {hasFilteredData &&
          filteredProjects.map(c => (
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

export default ProjectsOverview;
