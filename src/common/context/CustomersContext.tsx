import { CustomerAPI } from "common/api/CustomerAPI";
import React, { useContext, useEffect, useState } from "react";
import { Customer } from "types/Customer";

interface Props {
  children?: React.ReactNode;
}

interface CustomersContextProps {
  data: Customer[];
  actions: {
    create: (dto: Customer) => Promise<Customer>;
    update: (id: Customer["id"], dto: Customer) => Promise<Customer>;
  };
}

const CustomersContext = React.createContext<CustomersContextProps>({
  data: [],
  actions: {
    create: (): Promise<Customer> => Promise.reject(),
    update: (): Promise<Customer> => Promise.reject(),
  },
});
export default CustomersContext;

export const CustomersContextProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const [customers, setCustomers] = useState<Customer[]>([]);

  const getAllCustomers = (): void => {
    CustomerAPI.getAll().then(res => setCustomers(res));
  };

  const createCustomer = (dto: Customer): Promise<Customer> => {
    return CustomerAPI.create(dto).then(res => {
      setCustomers([...customers, res]);
      return res;
    });
  };

  const updateCustomer = (
    id: Customer["id"],
    dto: Customer
  ): Promise<Customer> => {
    return CustomerAPI.update(id, dto).then(res => {
      setCustomers(
        customers.map(p => {
          if (p.id === res.id) {
            return res;
          }
          return p;
        })
      );
      return res;
    });
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
        },
      }}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = (): CustomersContextProps =>
  useContext(CustomersContext);
