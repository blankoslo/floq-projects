import { useToast } from "common/components/toast/ToastContext";
import { useCustomers } from "common/context/CustomersContext";
import { useProjects } from "common/context/ProjectsContext";
import { IsValidCustomer, IsValidProject } from "common/DataCheckers";
import FloqForm from "common/floq/components/FloqForm/FloqForm";
import FloqModal from "common/floq/components/FloqModal/FloqModal";
import FloqTab from "common/floq/components/FloqTabs/FloqTab";
import FloqTabs from "common/floq/components/FloqTabs/FloqTabs";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Customer } from "types/Customer";
import NewCustomerProjectForm, {
  NewCustomerProjectValues,
} from "./NewCustomerProjectForm";
import NewProjectForm, { NewProjectValues } from "./NewProjectForm";

type NewProjectOptions =
  | { type: "existing-customer"; customerId?: Customer["id"] }
  | { type: "new-customer"; customerName?: string };

const NewProjectDialog: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(true);

  const history = useHistory();

  const onClose = (): void => {
    setOpen(false);
    history.push("/projects");
  };

  const ctxProjects = useProjects();

  const toast = useToast();

  const onSubmitExistingCustomer = (values: NewProjectValues): void => {
    // TODO: Implement this in database
    delete values.subcontractor;

    const project = { ...values, active: true };
    if (IsValidProject(project)) {
      ctxProjects.actions
        .create(project)
        .then(res => {
          toast.show("success", `${res.id} lagt til`);
          history.push("/projects");
        })
        .catch(err => {
          toast.show("error", `Noe gikk galt: ${err}`);
        });
    }
  };

  const ctxCustomers = useCustomers();

  const onSubmitNewCustomer = (values: NewCustomerProjectValues): void => {
    // TODO: Implement this in database
    delete values.subcontractor;

    const { customerName, customerId, ...rest } = values;
    const customer = { id: customerId, name: customerName };
    const project = { ...rest, customer: customer.id, active: true };
    if (IsValidCustomer(customer) && IsValidProject(project)) {
      ctxCustomers.actions
        .create(customer)
        .then(() => ctxProjects.actions.create(project))
        .then(res => {
          toast.show("success", `${res.id} lagt til`);
          history.push("/projects");
        })
        .catch(err => {
          toast.show("error", `Noe gikk galt: ${err}`);
        });
    }
  };

  const location = useLocation();

  const [tab, setTab] = useState<NewProjectOptions>({
    type: "existing-customer",
  });
  useEffect(() => {
    const search = new URLSearchParams(location.search);

    if (search.has("new-customer")) {
      const customerName = search.get("new-customer");
      setTab({
        type: "new-customer",
        customerName: (customerName && customerName) || undefined,
      });
    } else if (search.has("existing-customer")) {
      const customerId = search.get("existing-customer");
      setTab({
        type: "existing-customer",
        customerId: (customerId && customerId) || undefined,
      });
    } else {
      history.push("?existing-customer");
    }
  }, [location.search]);

  return (
    <FloqModal open={isOpen} onClose={onClose} title="Legg til prosjekt">
      <FloqForm>
        <FloqTabs>
          <FloqTab
            label="Velg kunde"
            active={tab.type === "existing-customer"}
            onClick={(): void => {
              history.push("?existing-customer");
            }}
          />
          <FloqTab
            label="Ny kunde"
            active={tab.type === "new-customer"}
            onClick={(): void => {
              history.push("?new-customer");
            }}
          />
        </FloqTabs>
        {tab.type === "existing-customer" && (
          <NewProjectForm
            customerId={tab.customerId}
            onCancel={onClose}
            onSubmit={onSubmitExistingCustomer}
          />
        )}
        {tab.type === "new-customer" && (
          <NewCustomerProjectForm
            customerName={tab.customerName}
            onCancel={onClose}
            onSubmit={onSubmitNewCustomer}
          />
        )}
      </FloqForm>
    </FloqModal>
  );
};

export default NewProjectDialog;
