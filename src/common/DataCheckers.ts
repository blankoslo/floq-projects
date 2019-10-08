import { createCheckers } from "ts-interface-checker";
import { BasicType, basicTypes } from "ts-interface-checker/dist/types";
import { Customer, Customers } from "../types/Customer";
import { Employee, Employees } from "../types/Employee";
import { Project, Projects } from "../types/Project";
import { TokenData } from "../types/TokenData";
import CustomerTI from "./validators/Customer-ti";
import EmployeeTI from "./validators/Employee-ti";
import ProjectTI from "./validators/Project-ti";
import TokenDataTI from "./validators/TokenData-ti";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type  */

basicTypes["Date"] = new BasicType(v => v instanceof Date, "is not a Date");

const {
  Customer: CustomerChecker,
  Customers: CustomersChecker,
} = createCheckers(CustomerTI);

export function IsValidCustomer(value: any): value is Customer {
  return CustomerChecker.test(value);
}

export function IsValidCustomers(value: any): value is Customers {
  return CustomersChecker.test(value);
}

export const {
  Employee: EmployeeChecker,
  Employees: EmployeesChecker,
} = createCheckers(EmployeeTI);

export function IsValidEmployee(value: any): value is Employee {
  return EmployeeChecker.test(value);
}

export function IsValidEmployees(value: any): value is Employees {
  return EmployeesChecker.test(value);
}

export const {
  ProjectEmployee: ProjectEmployeeChecker,
  ProjectEmployees: ProjectEmployeesChecker,
} = createCheckers(EmployeeTI);

export function IsValidProjectEmployee(value: any): value is Employee {
  return ProjectEmployeeChecker.test(value);
}

export function IsValidProjectEmployees(value: any): value is Employees {
  return ProjectEmployeesChecker.test(value);
}

const { Project: ProjectChecker, Projects: ProjectsChecker } = createCheckers(
  ProjectTI
);

export function IsValidProject(value: any): value is Project {
  return ProjectChecker.test(value);
}

export function IsValidProjects(value: any): value is Projects {
  return ProjectsChecker.test(value);
}

const { TokenData: TokenDataChecker } = createCheckers(TokenDataTI);

export function IsValidTokenData(value: any): value is TokenData {
  return TokenDataChecker.test(value);
}
