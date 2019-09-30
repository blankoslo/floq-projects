import { Projects, Project } from "../../types/Project";
import { IsValidProjects, IsValidProject } from "../DataCheckers";
import { BaseAPI } from "./BaseAPI";

const PROJECT_API_URL = `${BaseAPI.config.config.apiUri}/projects`;

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

const get = (id: Project["id"]): Promise<Project> =>
  fetch(
    `${PROJECT_API_URL}?${new URLSearchParams({
      select: "id,name,billable,customer,responsible,active",
      id: `eq.${id}`,
    }).toString()}`,
    BaseAPI.requestOptions
  )
    .then(res => res.json())
    .then(res => {
      if (IsValidProject(res)) {
        return Promise.resolve(res);
      }
      return Promise.reject("Response does not validate");
    });

export const ProjectAPI = {
  getAll,
  get,
};
