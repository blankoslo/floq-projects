import { useCustomers } from "common/context/CustomersContext";
import { useEmployees } from "common/context/EmployeesContext";
import FloqButton from "common/floq/components/FloqButton/FloqButton";
import FloqButtonGroup from "common/floq/components/FloqButtonGroup/FloqButtonGroup";
import FloqCheckbox from "common/floq/components/FloqCheckbox/FloqCheckbox";
import FloqForm from "common/floq/components/FloqForm/FloqForm";
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
import { Employee } from "types/Employee";
import { Billable, Project } from "types/Project";
import { billableElements, EmployeeOption } from "./common";

export interface EditProjectValues {
  name: string;
  responsible: Employee["id"];
  subcontractor: boolean;
  billable: Billable;
  active: boolean;
}

type EditProjectFormProps = {
  project: Project;
  onCancel: () => void;
  onSubmit: (values: EditProjectValues) => void;
};

const EditProjectForm: React.FC<EditProjectFormProps> = (
  props: EditProjectFormProps
) => {
  const { project, onCancel, onSubmit } = props;

  const ctxCustomers = useCustomers();
  const customer = ctxCustomers.data.find(c => c.id === project.customer);

  const ctxEmployees = useEmployees();
  const optionsEmployees = ctxEmployees.data.map(
    (e): EmployeeOption => ({
      value: e.id,
      label: [e.first_name, e.last_name, e.emoji].filter(Boolean).join(" "),
    })
  );

  const [values, setValues] = useState<{
    billable?: Billable;
    responsible?: EmployeeOption;
    active?: boolean;
  }>({
    billable: project.billable,
    responsible: optionsEmployees.find(e => e.value === project.responsible),
    active: project.active,
  });

  const { register, handleSubmit, setValue, errors } = useForm<
    EditProjectValues
  >({
    defaultValues: {
      name: project.name,
      responsible: project.responsible,
      billable: project.billable,
      active: project.active,
    },
  });

  useEffect(() => {
    register({ name: "responsible" }, { required: true });
    register({ name: "billable" }, { required: true });
    register({ name: "active" }, { required: true });
  }, [register]);

  const onChangeEmployee = (
    value: ValueType<EmployeeOption>,
    action: ActionMeta
  ): void => {
    switch (action.action) {
      case "select-option": {
        const option = value as EmployeeOption;
        setValue("responsible", option.value, true);
        setValues({
          ...values,
          responsible: option,
        });
        break;
      }
    }
  };

  return (
    <FloqForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FloqFormControl size="medium">
          <FloqInputLabel label="Kunde" />
          <FloqInput>
            <span>{customer && `${customer.name} (${customer.id})`}</span>
          </FloqInput>
        </FloqFormControl>

        <FloqFormControl size="small">
          <FloqInputLabel label="Prosjektkode" />
          <FloqInput>
            <span>{project.id}</span>
          </FloqInput>
        </FloqFormControl>

        <FloqFormControl size="medium">
          <FloqInputLabel label="Prosjektnavn" />
          <FloqInput error={errors.name && "Påkrevd"}>
            <FloqInputField
              type="text"
              name="name"
              ref={register({ required: true })}
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
          <FloqInput error={errors.responsible && "Påkrevd"}>
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
          <FloqInput error={errors.billable && "Påkrevd"}>
            <FloqButtonGroup>
              {billableElements.map(e => (
                <FloqButton
                  type="button"
                  key={e.label}
                  variant={(values.billable === e.value && "pink") || "creamy"}
                  onClick={(): void => {
                    setValues({ ...values, billable: e.value });
                    setValue("billable", e.value, true);
                  }}>
                  {e.label}
                </FloqButton>
              ))}
            </FloqButtonGroup>
          </FloqInput>
        </FloqFormControl>

        <FloqFormControl size="medium">
          <FloqInputLabel label="Status" />
          <FloqInput error={errors.active && "Påkrevd"}>
            <FloqButtonGroup>
              <FloqButton
                type="button"
                variant={(values.active && "purple") || "creamy"}
                onClick={(): void => {
                  setValues({ ...values, active: true });
                  setValue("active", true, true);
                }}>
                Aktiv
              </FloqButton>
              <FloqButton
                type="button"
                variant={(!values.active && "purple") || "creamy"}
                onClick={(): void => {
                  setValues({ ...values, active: false });
                  setValue("active", false, true);
                }}>
                Inaktiv
              </FloqButton>
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
    </FloqForm>
  );
};

export default EditProjectForm;
