import { Project } from "types/Project";
import { SDGEvent } from "types/SDGEvent";
import {
  IsValidProject,
  IsValidProjects,
  IsValidSDGEvents,
} from "../DataCheckers";
import { BaseAPI } from "./BaseAPI";

const PROJECT_API_URL = `${BaseAPI.config.config.apiUri}/projects`;
const PROJECT_SDG_API_URL = `${BaseAPI.config.config.apiUri}/project_sdg_events`;

const getAll = (): Promise<Project[]> =>
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
      if (IsValidProjects(res) && res.length === 1) {
        return Promise.resolve(res[0]);
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

const getSDGEvents = (id: Project["id"]): Promise<SDGEvent[]> =>
  fetch(
    `${PROJECT_SDG_API_URL}?${new URLSearchParams({
      project: `eq.${id}`,
      order: "event_id.asc",
    }).toString()}`,
    BaseAPI.requestOptions
  )
    .then(res => res.json())
    .then(res => {
      return IsValidSDGEvents(res)
        ? Promise.resolve(res)
        : Promise.reject("Response does not validate");
    });

const createSDGEvents = (dtos: SDGEvent[]): Promise<SDGEvent[]> =>
  fetch(`${PROJECT_SDG_API_URL}`, {
    ...BaseAPI.requestOptions,
    method: "POST",
    body: JSON.stringify(dtos),
  })
    .then(res => res.json())
    .then(res => {
      if (IsValidSDGEvents(res)) {
        return Promise.resolve(res);
      }
      return Promise.reject("Response does not validate");
    });

export const ProjectAPI = {
  getAll,
  get,
  create,
  update,
  getSDGEvents,
  createSDGEvents,
};
