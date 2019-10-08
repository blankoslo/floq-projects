import { EmployeeAPI } from "common/api/EmployeeAPI";
import React, { useContext, useEffect, useState } from "react";
import { Employee } from "types/Employee";

interface Props {
  children?: React.ReactNode;
}

interface EmployeesContextProps {
  data: Employee[];
}

const EmployeesContext = React.createContext<EmployeesContextProps>({
  data: [],
});
export default EmployeesContext;

export const EmployeesContextProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;

  const [employees, setEmployees] = useState<Employee[]>([]);

  const getAllEmployees = (): void => {
    EmployeeAPI.getAll().then(res => setEmployees(res));
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <EmployeesContext.Provider
      value={{
        data: employees,
      }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = (): EmployeesContextProps =>
  useContext(EmployeesContext);
