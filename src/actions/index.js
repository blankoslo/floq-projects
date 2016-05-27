import * as api from '../apiclient';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CREATE_PROJECT = 'UPDATE_PROJECT';
export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: api.getProjects()
});

export const fetchProject = (id) => ({
  type: FETCH_PROJECT,
  payload: api.getProject(id)
});

export const fetchCustomers = () => ({
  type: FETCH_CUSTOMERS,
  payload: api.getCustomers()
});

export const updateProject = (id, data) => ({
  type: UPDATE_PROJECT,
  payload: api.updateProject(id, data)
});

export const createProject = data => ({
  type: CREATE_PROJECT,
  payload: api.createProject(data)
});
