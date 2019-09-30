import { CustomerAPI } from "common/api/CustomerAPI";
import React, { useContext, useEffect, useState } from "react";
import { Customer } from "types/Customer";

interface Props {
  children?: React.ReactNode;
}

interface CustomersContextProps {
  data: Customer[];
  actions: {
    create: (dto: Customer) => void;
    update: (id: Customer["id"], dto: Customer) => void;
    delete: (id: Customer["id"]) => void;
  };
}

const CustomersContext = React.createContext<CustomersContextProps>({
  data: [],
  actions: {
    create: (dto: Customer): void => {},
    update: (id: Customer["id"], dto: Customer): void => {},
    delete: (id: Customer["id"]): void => {},
  },
});
export default CustomersContext;

export const CustomersContextProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const [customers, setCustomers] = useState<Customer[]>([]);

  const getAllCustomers = (): void => {
    CustomerAPI.getAll().then(res => setCustomers(res));
  };

  const createCustomer = (dto: Customer): void => {
    setCustomers([...customers, dto]);
  };

  const updateCustomer = (id: Customer["id"], dto: Customer): void => {
    setCustomers(
      customers.map(p => {
        if (p.id === id) {
          return dto;
        }
        return p;
      })
    );
  };

  const deleteCustomer = (id: Customer["id"]): void => {
    setCustomers(customers.filter(p => p.id !== id));
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        data: customers,
        actions: {
          create: createCustomer,
          update: updateCustomer,
          delete: deleteCustomer,
        },
      }}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = (): CustomersContextProps =>
  useContext(CustomersContext);
