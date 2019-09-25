import { createCheckers } from "ts-interface-checker";
import { Customer, Customers } from "../types/customer";
import { Employee, Employees } from "../types/employee";
import { Project, Projects } from "../types/project";
import CustomerTI from "./validators/customer-ti";
import EmployeeTI from "./validators/employee-ti";
import ProjectTI from "./validators/project-ti";

const { CustomerChecker, CustomersChecker } = createCheckers(CustomerTI);

/* eslint-disable @typescript-eslint/no-explicit-any */

export function IsValidCustomer(value: any): value is Customer {
  return CustomerChecker.test(value);
}

export function IsValidCustomers(value: any): value is Customers {
  return CustomersChecker.test(value);
}

const { EmployeeChecker, EmployeesChecker } = createCheckers(EmployeeTI);

export function IsValidEmployee(value: any): value is Employee {
  return EmployeeChecker.test(value);
}

export function IsValidEmployees(value: any): value is Employees {
  return EmployeesChecker.test(value);
}

const { ProjectChecker, ProjectsChecker } = createCheckers(ProjectTI);

export function IsValidProject(value: any): value is Project {
  return ProjectChecker.test(value);
}

export function IsValidProjects(value: any): value is Projects {
  return ProjectsChecker.test(value);
}
