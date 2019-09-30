import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
import { useCustomers } from "common/context/CustomersContext";
import { useEmployees } from "common/context/EmployeesContext";
import { useProjects } from "common/context/ProjectsContext";
import React, { useEffect, useState } from "react";
import { Project } from "types/Project";

interface Props {
  projectId: Project["id"];
  isOpen: boolean;
  onClose: () => void;
}

const billableElements = [
  { value: "billable", name: "Fakturerbart prosjekt" },
  { value: "nonbillable", name: "Ikke-fakturerbart prosjekt" },
  { value: "unavailable", name: "Utilgjengelig tid" },
].map(c => (
  <MenuItem key={c.value} value={c.value}>
    {c.name}
  </MenuItem>
));

const EditProjectDialog: React.FC<Props> = (props: Props) => {
  const { projectId, isOpen, onClose } = props;
  if (!isOpen) {
    console.log("Not open");
    return null;
  }

  const ctxEmployees = useEmployees();
  const ctxCustomers = useCustomers();
  const ctxProjects = useProjects();

  const project = ctxProjects.data.find(p => p.id === projectId);
  if (!project) {
    return null;
  }

  const customer = ctxCustomers.data.find(c => c.id === project.customer);
  if (!customer) {
    return null;
  }

  const responsible = ctxEmployees.data.find(e => e.id === project.responsible);
  if (!responsible) {
    return null;
  }

  const onSave = (): void => {
    if (project) {
      ctxProjects.actions.update(project.id, {
        ...project,
        name: "JUST TESTING",
      });
    }
    onClose();
  };

  const employeeElements = ctxEmployees.data.map(e => ({
    value: e.id,
    label: [e.first_name, e.last_name, e.emoji].filter(w => !!w).join(" "),
  }));

  const [selected, setSelected] = useState("");
  useEffect(() => {
    if (project && project.responsible) {
      setSelected(project.responsible.toString());
    }
  }, [project]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      {!project && <CircularProgress variant="indeterminate" />}
      {project && (
        <>
          <DialogTitle>
            {customer.name}: {project.name}
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column">
              <FormControlLabel
                control={<Switch checked={project.active} color="primary" />}
                label="Aktiv"
              />

              <TextField
                margin="dense"
                type="text"
                name="customer"
                label="Kunde"
                value={customer.name}
                disabled
              />

              <TextField
                margin="dense"
                type="text"
                name="id"
                label="Prosjektkode"
                value={project.id}
                disabled
              />

              <TextField
                margin="dense"
                type="text"
                name="name"
                label="Prosjekt"
                value={project.name}
              />

              <FormControl>
                <InputLabel htmlFor="billable">Fakturerbar</InputLabel>
                <Select
                  value={project.billable}
                  inputProps={{
                    name: "billable",
                    id: "billable",
                  }}>
                  {billableElements}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="responsible">Ansvarlig</InputLabel>
                <Select
                  value={selected}
                  onChange={e => setSelected(e.target.value as string)}
                  inputProps={{
                    name: "responsible",
                    id: "responsible",
                  }}>
                  {employeeElements.map(e => (
                    <MenuItem key={e.value} value={e.value}>
                      {e.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Avbryt
        </Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Lagre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProjectDialog;
