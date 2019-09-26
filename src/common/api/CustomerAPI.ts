import { BaseAPI } from "./BaseAPI";
import { Customer } from "types/Customer";
import { IsValidCustomers } from "common/DataCheckers";

const CUSTOMER_API_URL = `${BaseAPI.config.config.apiUri}/customers`;

const getAll = (): Promise<Customer[]> =>
  fetch(`${CUSTOMER_API_URL}`, BaseAPI.requestOptions)
    .then(res => res.json())
    .then(res => {
      if (IsValidCustomers(res)) {
        return Promise.resolve(res);
      }
      return Promise.reject("Response does not validate");
    });

export const CustomerAPI = {
  getAll,
};
