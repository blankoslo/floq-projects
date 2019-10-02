import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { useCustomers } from "common/context/CustomersContext";
import { useEmployees } from "common/context/EmployeesContext";
import { Field, Form, Formik, FormikActions } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { useHistory } from "react-router";
import { Billable } from "types/Project";
import * as yup from "yup";
import NewCustomerForm from "./NewCustomerForm";

const NewProjectSchema = yup.object().shape({
  customer: yup.string().required("Et prosjekt må ha en kunde"),
  id: yup.string().required("Et prosjekt må ha en kode"),
  name: yup.string().required("Et prosjekt må ha et navn"),
  billable: yup
    .string()
    .oneOf(["billable", "nonbillable", "unavailable"] as Billable[])
    .required("Et prosjekt må ha en type fakturerbarhet"),
  responsible: yup
    .number()
    .integer()
    .required("Et prosjekt må ha en ansvarlig ansatt"),
});

type FormikNewProject = yup.InferType<typeof NewProjectSchema>;

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

const NewProjectDialog: React.FC = () => {
  const ctxCustomers = useCustomers();

  const customerElements = ctxCustomers.data.map(c => (
    <MenuItem key={c.id} value={c.id}>
      {c.name}
    </MenuItem>
  ));

  const ctxEmployees = useEmployees();

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
    values: FormikNewProject,
    actions: FormikActions<FormikNewProject>
  ): void => {
    actions.setSubmitting(true);
    console.log(values);
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>Kunde</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Velg eksisterende eller opprett ny kunde.
        </DialogContentText>
        <NewCustomerForm />
      </DialogContent>
      <DialogTitle>Prosjekt</DialogTitle>
      <DialogContent>
        <DialogContentText>Opprett nytt prosjekt.</DialogContentText>
        <Formik
          initialValues={{
            customer: "",
            id: "",
            name: "",
            billable: "billable",
            responsible: 0,
          }}
          validationSchema={NewProjectSchema}
          onSubmit={onSubmit}
          render={(): React.ReactNode => (
            <Form>
              <Grid container direction="column">
                <Field
                  type="text"
                  name="customer"
                  label="Kunde"
                  component={TextField}
                  margin="dense"
                  select
                  inputProps={{
                    name: "customer",
                    id: "customer",
                  }}>
                  {customerElements}
                </Field>

                <Field
                  type="text"
                  name="id"
                  label="Prosjektkode"
                  component={TextField}
                  margin="dense"
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

                <Grid item container direction="row" justify="flex-end">
                  <Button
                    onClick={onClose}
                    variant="contained"
                    color="secondary">
                    Avbryt
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Lagre
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
