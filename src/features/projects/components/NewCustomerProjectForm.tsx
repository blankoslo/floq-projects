import { useEmployees } from "common/context/EmployeesContext";
import FloqButton from "common/floq/components/FloqButton/FloqButton";
import FloqButtonGroup from "common/floq/components/FloqButtonGroup/FloqButtonGroup";
import FloqCheckbox from "common/floq/components/FloqCheckbox/FloqCheckbox";
import FloqFormControl from "common/floq/components/FloqFormControl/FloqFormControl";
import FloqInput from "common/floq/components/FloqInput/FloqInput";
import FloqInputField from "common/floq/components/FloqInput/FloqInputField";
import FloqInputLabel from "common/floq/components/FloqInputLabel/FloqInputLabel";
import FloqModalActions from "common/floq/components/FloqModal/FloqModalActions";
import { FloqReactSelectStyles } from "common/floq/components/FloqReactSelect/FloqReactSelectStyles";
import React, { useEffect, useState } from "react";
import useForm from "react-hook-form";
import Select from "react-select";
import { ActionMeta, ValueType } from "react-select/src/types";
import { Billable, Project } from "types/Project";
import { billableElements, EmployeeOption } from "./common";
import { Customer } from "types/Customer";
import { Employee } from "types/Employee";
import { useProjects } from "common/context/ProjectsContext";
import { useCustomers } from "common/context/CustomersContext";

type NewCustomerProjectDialogProps = {
  customerName?: string;
  onCancel: () => void;
  onSubmit: (values: NewCustomerProjectValues) => void;
};

export interface NewCustomerProjectValues {
  customerName: string;
  customerId: Customer["id"];

  id: Project["id"];
  name: string;
  responsible: Employee["id"];
  subcontractor: boolean;
  billable: Billable;
}

const NewCustomerProjectForm: React.FC<NewCustomerProjectDialogProps> = (
  props: NewCustomerProjectDialogProps
) => {
  const { customerName, onCancel, onSubmit } = props;

  const ctxEmployees = useEmployees();
  const optionsEmployees = ctxEmployees.data.map(
    (e): EmployeeOption => ({
      value: e.id,
      label: [e.first_name, e.last_name, e.emoji].filter(Boolean).join(" "),
    })
  );

  const ctxCustomers = useCustomers();
  const ctxProjects = useProjects();

  const [values, setValues] = useState<{
    billable?: Billable;
    responsible?: EmployeeOption;
  }>({ billable: "billable" });

  const { register, handleSubmit, watch, setValue, errors } = useForm<
    NewCustomerProjectValues
  >({ defaultValues: { billable: "billable" } });

  useEffect(() => {
    register({ name: "responsible" }, { required: "Påkrevd" });
    register({ name: "billable" }, { required: "Påkrevd" });
  }, [register]);

  useEffect(() => {
    if (customerName) {
      setValue("customerName", customerName);
    }
  }, [customerName]);

  const formValues = watch();

  useEffect(() => {
    if (!formValues.customerName) return;

    const id = formValues.customerName
      .replace(/\s/g, "")
      .slice(0, 3)
      .toUpperCase();
    setValue("customerId", id, true);
  }, [formValues.customerName]);

  useEffect(() => {
    if (!formValues.customerId) return;

    setValue("id", `${formValues.customerId}1000`, true);
  }, [formValues.customerId]);

  const onChangeEmployee = (
    value: ValueType<EmployeeOption>,
    action: ActionMeta
  ): void => {
    switch (action.action) {
      case "select-option": {
        const option = value as EmployeeOption;
        setValue("responsible", option.value);
        setValues({
          ...values,
          responsible: option,
        });
        break;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FloqFormControl size="medium">
        <FloqInputLabel label="Kundenavn" />
        <FloqInput error={errors.customerName && errors.customerName.message}>
          <FloqInputField
            type="text"
            name="customerName"
            ref={register({
              required: "Påkrevd",
            })}
          />
        </FloqInput>
      </FloqFormControl>

      <FloqFormControl size="small">
        <FloqInputLabel label="Kundekode" />
        <FloqInput error={errors.customerId && errors.customerId.message}>
          <FloqInputField
            type="text"
            name="customerId"
            ref={register({
              required: "Påkrevd",
              pattern: { value: /^.{3}$/, message: "Feil format" },
              validate: (input: string) =>
                !ctxCustomers.data.find(p => p.id === input) || "I bruk",
            })}
          />
        </FloqInput>
      </FloqFormControl>

      <FloqFormControl size="small">
        <FloqInputLabel label="Prosjektkode" />
        <FloqInput error={errors.id && errors.id.message}>
          <FloqInputField
            type="text"
            name="id"
            ref={register({
              required: "Påkrevd",
              pattern: { value: /^.{3}\d{4}$/, message: "Feil format" },
              validate: (input: string) =>
                !ctxProjects.data.find(p => p.id === input) || "I bruk",
            })}
          />
        </FloqInput>
      </FloqFormControl>

      <FloqFormControl size="medium">
        <FloqInputLabel label="Prosjektnavn" />
        <FloqInput error={errors.name && errors.name.message}>
          <FloqInputField
            type="text"
            name="name"
            ref={register({ required: "Påkrevd" })}
          />
        </FloqInput>
      </FloqFormControl>

      <FloqFormControl size="medium">
        <FloqInput>
          <FloqCheckbox
            name="subcontractor"
            label="Underleverandør"
            ref={register}
          />
        </FloqInput>
      </FloqFormControl>

      <FloqFormControl size="medium">
        <FloqInputLabel label="Ansvarlig" />
        <FloqInput error={errors.responsible && errors.responsible.message}>
          <Select
            value={values.responsible}
            onChange={onChangeEmployee}
            styles={FloqReactSelectStyles}
            options={optionsEmployees}
            placeholder={"Knut?"}
          />
        </FloqInput>
      </FloqFormControl>

      <FloqFormControl size="medium">
        <FloqInputLabel label="Type" />
        <FloqInput error={errors.billable && errors.billable.message}>
          <FloqButtonGroup>
            {billableElements.map(e => (
              <FloqButton
                type="button"
                key={e.label}
                variant={(values.billable === e.value && "pink") || "creamy"}
                onClick={(): void => {
                  setValues({ ...values, billable: e.value });
                  setValue("billable", e.value);
                }}>
                {e.label}
              </FloqButton>
            ))}
          </FloqButtonGroup>
        </FloqInput>
      </FloqFormControl>

      <FloqModalActions>
        <FloqButton fullWidth action onClick={onCancel} type="button">
          Avbryt
        </FloqButton>
        <FloqButton fullWidth action variant="yellow" type="submit">
          Lagre
        </FloqButton>
      </FloqModalActions>
    </form>
  );
};

export default NewCustomerProjectForm;
