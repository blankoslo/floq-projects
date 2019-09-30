import { useCustomers } from "common/context/CustomersContext";
import { useProjects } from "common/context/ProjectsContext";
import React, { useEffect, useState } from "react";
import { Customer } from "types/Customer";
import { Project } from "types/Project";
import CustomerProjectsList from "./CustomerProjectsList";
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

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

  return (
    <div className="overview">
      <div className="topbar">
        <Button variant="contained" color="primary" size="medium">
          Legg til prosjekt
        </Button>
        <TextField
          variant="standard"
          color="primary"
          label="Søk"
          autoFocus
          onChange={e => setSearch(e.currentTarget.value)}
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
              onChange={e => setFilterActive(e.target.checked)}
            />
          }
          label="Vis kun aktive prosjekter"
        />
      </div>
      <div className="projects">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(c => (
            <CustomerProjectsList
              key={`customer-${c.customer.id}`}
              customer={c.customer}
              projects={c.projects}
            />
          ))
        ) : (
          <Typography variant="h1">😬</Typography>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
