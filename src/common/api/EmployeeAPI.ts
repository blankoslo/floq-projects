import { IsValidEmployees } from "common/DataCheckers";
import { Employee } from "types/Employee";
import { BaseAPI } from "./BaseAPI";

const EMPLOYEE_API_URL = `${BaseAPI.config.config.apiUri}/employees`;

const getAll = (): Promise<Employee[]> =>
  fetch(`${EMPLOYEE_API_URL}`, BaseAPI.requestOptions)
    .then(res => res.json())
    .then(res => {
      if (IsValidEmployees(res)) {
        return Promise.resolve(res);
      }
      return Promise.reject("Response does not validate");
    });

export const EmployeeAPI = {
  getAll,
};
