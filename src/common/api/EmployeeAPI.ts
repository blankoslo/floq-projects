import { IsValidEmployees, EmployeesChecker } from "common/DataCheckers";
import { BaseAPI } from "./BaseAPI";
import { Employee } from "types/Employee";

const EMPLOYEE_API_URL = `${BaseAPI.config.config.apiUri}/employees`;

const getAll = (): Promise<Employee[]> =>
  fetch(`${EMPLOYEE_API_URL}`, BaseAPI.requestOptions)
    .then(res => res.json())
    .then(res => {
      EmployeesChecker.check(res);
      if (IsValidEmployees(res)) {
        return Promise.resolve(res);
      }
      return Promise.reject("Response does not validate");
    });

export const EmployeeAPI = {
  getAll,
};
