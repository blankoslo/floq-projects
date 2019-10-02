import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField as MUITextField,
} from "@material-ui/core";
import { useCustomers } from "common/context/CustomersContext";
import { useEmployees } from "common/context/EmployeesContext";
import { useProjects } from "common/context/ProjectsContext";
import { Field, Form, Formik, FormikActions } from "formik";
import { Switch, TextField } from "formik-material-ui";
import React from "react";
import { useHistory } from "react-router";
import { Billable, Project } from "types/Project";
import * as yup from "yup";
import { isCurrentlyEmployed } from "common/utils/EmployeeFilters";

const EditProjectSchema = yup.object().shape({
  active: yup
    .boolean()
    .required("Et prosjekt må enten være aktivt eller inaktivt"),
  id: yup.string().required("Et prosjekt må ha en prosjektkode"),
  name: yup.string().required("Et prosjekt må ha et navn"),
  billable: yup
    .string()
    .oneOf(["billable", "nonbillable", "unavailable"] as Billable[])
    .required("Et prosjekt må ha fakturerbarhet"),
  responsible: yup
    .number()
    .integer()
    .required("Et prosjekt må ha en ansvarlig"),
});

type FormikProject = yup.InferType<typeof EditProjectSchema>;

interface Props {
  projectId: Project["id"];
}

const mapBillable: { value: Billable; name: string }[] = [
  { value: "billable", name: "Fakturerbart" },
  { value: "nonbillable", name: "Ikke-fakturerbart" },
  { value: "unavailable", name: "Utilgjengelig tid" },
];

const billableElements = mapBillable.map(c => (
  <MenuItem key={c.value} value={c.value}>
    {c.name}
  </MenuItem>
));

const EditProjectDialog: React.FC<Props> = (props: Props) => {
  const { projectId } = props;

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

  const responsible = ctxEmployees.data
    .filter(isCurrentlyEmployed)
    .find(e => e.id === project.responsible);
  if (!responsible) {
    return null;
  }

  const mapEmployees = ctxEmployees.data.map(e => ({
    value: e.id,
    name: [e.first_name, e.last_name, e.emoji].filter(Boolean).join(" "),
  }));

  const employeeElements = mapEmployees.map(c => (
    <MenuItem key={c.value} value={c.value}>
      {c.name}
    </MenuItem>
  ));

  const history = useHistory();

  const onClose = (): void => {
    history.push("/projects");
  };

  const onSubmit = (
    values: FormikProject,
    actions: FormikActions<FormikProject>
  ): void => {
    actions.setSubmitting(true);
    const updated: Project = {
      ...project,
      ...values,
      billable: values.billable as Billable,
    };
    ctxProjects.actions.update(project.id, updated).then(res => {
      console.log(res);
      actions.setSubmitting(false);
      onClose();
    });
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>Prosjekt</DialogTitle>
      <Formik
        initialValues={EditProjectSchema.cast(project)}
        validationSchema={EditProjectSchema}
        onSubmit={onSubmit}
        render={(): React.ReactNode => (
          <Form>
            <DialogContent>
              <Grid container direction="column">
                <FormControlLabel
                  control={
                    <Field
                      label="Aktiv"
                      name="active"
                      component={Switch}
                      color="primary"
                    />
                  }
                  label="Aktiv"
                />

                <MUITextField
                  type="text"
                  label="Kunde"
                  value={customer.name}
                  margin="dense"
                  disabled
                />

                <Field
                  type="text"
                  name="id"
                  label="Prosjektkode"
                  component={TextField}
                  margin="dense"
                  disabled
                />

                <Field
                  type="text"
                  name="name"
                  label="Prosjektnavn"
                  component={TextField}
                  margin="dense"
                />

                <Field
                  type="text"
                  name="billable"
                  label="Fakturerbar"
                  component={TextField}
                  margin="dense"
                  select
                  inputProps={{
                    name: "billable",
                    id: "billable",
                  }}>
                  {billableElements}
                </Field>

                <Field
                  type="text"
                  name="responsible"
                  label="Ansvarlig"
                  component={TextField}
                  margin="dense"
                  select
                  inputProps={{
                    name: "responsible",
                    id: "responsible",
                  }}>
                  {employeeElements}
                </Field>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} variant="contained" color="secondary">
                Avbryt
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Lagre
              </Button>
            </DialogActions>
          </Form>
        )}
      />
    </Dialog>
  );
};

export default EditProjectDialog;
