import * as api from '../apiclient';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: api.getProjects()
  .then(response => response.json())
});

export const updateProject = (id, data) => ({
  type: UPDATE_PROJECT,
  payload: api.updateProject(id, data)
  .then(response => response.json())
});

export const createProject = data => ({
  type: CREATE_PROJECT,
  payload: api.createProject(data)
  .then(response => response.json())
});

export const selectProject = id => ({
  type: SELECT_PROJECT,
  payload: id
});

export const fetchCustomers = () => ({
  type: FETCH_CUSTOMERS,
  payload: api.getCustomers()
  .then(response => response.json())
});
