import { Projects, Project } from "../../types/Project";
import { IsValidProjects, IsValidProject } from "../DataCheckers";
import { BaseAPI } from "./BaseAPI";

const PROJECT_API_URL = `${BaseAPI.config.config.apiUri}/projects`;

const getAll = (): Promise<Projects> =>
  fetch(
    `${PROJECT_API_URL}?${new URLSearchParams({
      order: "id.desc",
    }).toString()}`,
    BaseAPI.requestOptions
  )
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

const create = (dto: Project): Promise<Project> =>
  fetch(`${PROJECT_API_URL}`, {
    ...BaseAPI.requestOptions,
    method: "POST",
    body: JSON.stringify(dto),
  })
    .then(res => res.json())
    .then(res => {
      if (IsValidProject(res)) {
        return Promise.resolve(res);
      }
      return Promise.reject("Response does not validate");
    });

const update = (id: Project["id"], dto: Project): Promise<Project> =>
  fetch(
    `${PROJECT_API_URL}?${new URLSearchParams({
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
      if (IsValidProjects(res) && res.length === 1) {
        return Promise.resolve(res[0]);
      }
      return Promise.reject("Response does not validate");
    });

export const ProjectAPI = {
  getAll,
  get,
  create,
  update,
};
