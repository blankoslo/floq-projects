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
import SelectOption from "common/floq/components/SelectOption/SelectOption";
import React, { useEffect, useState } from "react";
import useForm from "react-hook-form";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { Billable } from "types/Project";

type CustomerOption = { value: string; label: string; tag: string };
type EmployeeOption = { value: number; label: string };
type BillableOption = { value: Billable; label: string };
const billableElements: BillableOption[] = [
  { value: "billable", label: "Fakturerbar" },
  { value: "nonbillable", label: "Ikke-fakturerbar" },
  { value: "unavailable", label: "Utilgjengelig tid" },
];

type NewProjectDialogProps = {
  onCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
};

const NewProjectForm: React.FC<NewProjectDialogProps> = (
  props: NewProjectDialogProps
) => {
  const { onCancel, onSubmit } = props;

  const ctxCustomers = useCustomers();

  const optionsCustomers = ctxCustomers.data.map(
    (c): CustomerOption => ({
      value: c.id,
      label: c.name,
      tag: c.id,
    })
  );

  const ctxEmployees = useEmployees();
  const optionsEmployees = ctxEmployees.data.map(
    (e): EmployeeOption => ({
      value: e.id,
      label: [e.first_name, e.last_name, e.emoji].filter(Boolean).join(" "),
    })
  );

  const [values, setValues] = useState<{
    billable?: Billable;
    customer?: CustomerOption;
    responsible?: EmployeeOption;
  }>({});

  const { register, handleSubmit, setValue, errors } = useForm();

  useEffect(() => {
    register({ name: "customer" }, { required: true });
    register({ name: "responsible" }, { required: true });
    register({ name: "billable" }, { required: true });
  }, [register]);

  return (
    <FloqForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FloqFormControl size="medium">
          <FloqInputLabel label="Kunde" />
          <FloqInput error={errors.customer && "Påkrevd"}>
            <Creatable
              value={values.customer}
              onChange={(option): void => {
                setValue("customer", (option as CustomerOption).value, true);
                setValues({
                  ...values,
                  customer: option as CustomerOption,
                });
              }}
              styles={FloqReactSelectStyles}
              formatOptionLabel={SelectOption}
              options={optionsCustomers}
              placeholder={""}
              isClearable
            />
          </FloqInput>
        </FloqFormControl>

        <FloqFormControl size="small">
          <FloqInputLabel label="Prosjektkode" />
          <FloqInput error={errors.id && "Påkrevd"}>
            <FloqInputField
              type="text"
              name="id"
              ref={register({ required: true })}
            />
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
          <FloqInputLabel label="Ansvarlig" />
          <FloqInput error={errors.responsible && "Påkrevd"}>
            <Select
              value={values.responsible}
              onChange={(option): void => {
                setValue("responsible", (option as EmployeeOption).value, true);
                setValues({
                  ...values,
                  responsible: option as EmployeeOption,
                });
              }}
              styles={FloqReactSelectStyles}
              options={optionsEmployees}
              placeholder={"Knut?"}
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

export default NewProjectForm;
