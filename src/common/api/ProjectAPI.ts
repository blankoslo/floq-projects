import { BaseAPI } from "./BaseAPI";
import { Projects } from "../../types/project";
import { IsValidProjects } from "../DataCheckers";

const PROJECT_API_URL = `${BaseAPI.API_URL}/projects`;

const GET_ALL_QUERY = new URLSearchParams({
  select: "id,name,billable,customer,responsible,active",
  order: "id.desc",
}).toString();

const getAll = (): Promise<Projects> =>
  fetch(`${PROJECT_API_URL}?${GET_ALL_QUERY}`, BaseAPI.requestOptions)
    .then(res => res.json())
    .then(res => {
      if (IsValidProjects(res)) {
        return Promise.resolve(res);
      }
      return Promise.reject("Response does not validate");
    });

export const ProjectAPI = {
  getAll,
};
