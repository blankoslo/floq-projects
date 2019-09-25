import { createCheckers } from "ts-interface-checker";
import { Customer } from "../types/customer";
import { Employee } from "../types/employee";
import { Project } from "../types/project";
import CustomerTI from "./validators/customer-ti";
import EmployeeTI from "./validators/employee-ti";
import ProjectTI from "./validators/project-ti";

const { Customer } = createCheckers(CustomerTI);
export function IsValidCustomer(value: any): value is Customer {
  return Customer.test(value);
}

const { Employee } = createCheckers(EmployeeTI);
export function IsValidEmployee(value: any): value is Employee {
  return Employee.test(value);
}

const { Project } = createCheckers(ProjectTI);
export function IsValidProject(value: any): value is Project {
  return Project.test(value);
}
