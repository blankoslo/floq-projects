import { Employee } from "types/Employee";

const isCurrentlyEmployed = (employee: Employee): boolean =>
  !employee.termination_date ||
  new Date(employee.termination_date) > new Date();

export { isCurrentlyEmployed };
