import Toast from "common/components/toast/Toast";
import { useCustomers } from "common/context/CustomersContext";
import { useProjects } from "common/context/ProjectsContext";
import FloqCheckbox from "common/floq/components/FloqCheckbox/FloqCheckbox";
import overviewStyles from "features/projects/styles/overview.module.scss";
import topbarStyles from "features/projects/styles/topbar.module.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import CustomerProjectsList from "./CustomerProjectsList";

interface CustomerProjects {
  customer: Customer;
  projects: Project[];
}

type ProjectsFilter = {
  search: string;
  onlyActive: boolean;
  onlyBillable: boolean;
};

const ProjectsOverview: React.FC = () => {
  const ctxCustomers = useCustomers();
  const ctxProjects = useProjects();

  const [filter, setFilter] = useState<ProjectsFilter>({
    search: "",
    onlyActive: true,
    onlyBillable: false,
  });

  const [filteredProjects, setFilteredProjects] = useState<CustomerProjects[]>(
    []
  );

  useEffect(() => {
    const lcSearch = filter.search.toLowerCase();

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
            .filter(p => (filter.onlyActive ? p.active : true))
            .filter(p =>
              filter.onlyBillable ? p.billable === "billable" : true
            )
            .filter(p => p.customer === c.id)
            .sort((a, b) => a.id.localeCompare(b.id)),
        }))
        .filter(cp => cp.projects.length > 0)
        .sort((a, b) => a.customer.name.localeCompare(b.customer.name))
    );
  }, [filter, ctxCustomers.data, ctxProjects.data]);

  const hasData = ctxProjects.data.length > 0;
  const hasFilteredData = filteredProjects.length > 0;

  const history = useHistory();

  return (
    <div className={"container"}>
      <div className={topbarStyles.topbar}>
        <button
          className={topbarStyles.addButton}
          onClick={(): void => history.push("/projects/new")}>
          <i className="material-icons">add</i>
          <span>Legg til prosjekt</span>
        </button>
        <div className={topbarStyles.searchWrapper}>
          <i className={`${topbarStyles.searchIcon} material-icons`}>search</i>
          <input
            type="text"
            autoFocus
            className={topbarStyles.search}
            placeholder="Søk på navn, tittel, emoji"
            onChange={(e): void =>
              setFilter({ ...filter, search: e.target.value })
            }
          />
        </div>
        <FloqCheckbox
          label="Vis kun aktive prosjekter"
          checked={filter.onlyActive}
          onChange={(e): void =>
            setFilter({ ...filter, onlyActive: e.target.checked })
          }
        />
        <FloqCheckbox
          label="Vis kun fakturerbare prosjekter"
          checked={filter.onlyBillable}
          onChange={(e): void =>
            setFilter({ ...filter, onlyBillable: e.target.checked })
          }
        />
      </div>
      <Toast />
      <div className={overviewStyles.projects}>
        {!hasData && (
          <span style={{ fontSize: "4rem", lineHeight: "1.5" }}>⏳</span>
        )}
        {hasData && !hasFilteredData && (
          <span style={{ fontSize: "4rem", lineHeight: "1.5" }}>😬</span>
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
