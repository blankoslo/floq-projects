import {
  Button,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useCustomers } from "common/context/CustomersContext";
import { useProjects } from "common/context/ProjectsContext";
import React, { useEffect, useState } from "react";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import CustomerProjectsList from "./CustomerProjectsList";
import "features/projects/styles/projects.scss";
import { useHistory } from "react-router";

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
      <div className="topbar">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={(): void => history.push("/projects/new")}>
          Legg til prosjekt
        </Button>
        <TextField
          variant="standard"
          color="primary"
          label="Søk"
          autoFocus
          onChange={(e): void => setSearch(e.currentTarget.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={filterActive}
              onChange={(e): void => setFilterActive(e.target.checked)}
            />
          }
          label="Vis kun aktive prosjekter"
        />
      </div>
      <div className="projects">
        {!hasData && <CircularProgress variant="indeterminate" />}
        {hasData && !hasFilteredData && (
          <Typography variant="h1">😬</Typography>
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

export default ProjectsList;
