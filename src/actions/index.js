import * as api from '../apiclient';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: api.getProjects()
});

export const fetchProject = (id) => ({
  type: FETCH_PROJECT,
  payload: api.getProject(id)
});

export const updateProject = (id, data) => ({
  type: UPDATE_PROJECT,
  payload: api.updateProject(id, data),
  meta: data
});
