import { Button, Grid, TextField as MUITextField } from "@material-ui/core";
import { Field, Form, Formik, FormikActions, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import * as yup from "yup";

const NewCustomerSchema = yup.object().shape({
  name: yup.string().required("En kunde må ha et navn"),
  id: yup.string().required("En kunde må ha en kode"),
});

type FormikNewCustomer = yup.InferType<typeof NewCustomerSchema>;

const NewCustomerForm: React.FC = () => {
  return (
    <Formik
      validationSchema={NewCustomerSchema}
      initialValues={{ name: "", id: "" }}
      onSubmit={(
        values: FormikNewCustomer,
        actions: FormikActions<FormikNewCustomer>
      ): void => {
        actions.setSubmitting(true);
        console.log(values);
      }}
      render={(
        formikProps: FormikProps<FormikNewCustomer>
      ): React.ReactNode => (
        <Form>
          <Grid container direction="column">
            <MUITextField
              type="text"
              name="name"
              label="Kundenavn"
              onChange={(e): void => {
                formikProps.handleChange(e);
                formikProps.setFieldValue(
                  "id",
                  e.target.value.slice(0, 3).toUpperCase()
                );
              }}
              onBlur={(e): void => formikProps.handleBlur(e)}
              value={formikProps.values.name}
              disabled={formikProps.isSubmitting}
            />

            <Field
              type="text"
              name="id"
              label="Kundekode"
              component={TextField}
              margin="dense"
            />

            <Grid item container direction="row" justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={formikProps.isSubmitting}>
                Opprett
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

export default NewCustomerForm;
