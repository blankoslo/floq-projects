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

const create = (dto: Customer): Promise<Customer> =>
  fetch(`${CUSTOMER_API_URL}`, {
    ...BaseAPI.requestOptions,
    method: "POST",
    body: JSON.stringify(dto),
  })
    .then(res => res.json())
    .then(res => {
      if (IsValidCustomers(res) && res.length === 1) {
        return Promise.resolve(res[0]);
      }
      return Promise.reject("Response does not validate");
    });

const update = (id: Customer["id"], dto: Customer): Promise<Customer> =>
  fetch(
    `${CUSTOMER_API_URL}?${new URLSearchParams({
      id: `eq.${id}`,
    }).toString()}`,
    {
      ...BaseAPI.requestOptions,
      method: "PATCH",
      body: JSON.stringify(dto),
    }
  )
    .then(res => res.json())
    .then(res => {
      if (IsValidCustomers(res) && res.length === 1) {
        return Promise.resolve(res[0]);
      }
      return Promise.reject("Response does not validate");
    });

export const CustomerAPI = {
  getAll,
  create,
  update,
};
