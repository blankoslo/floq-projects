import { getProjects, getProject } from '../apiclient';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECT = 'FETCH_PROJECT';


export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: getProjects()
});

export const fetchProject = (id) => ({
  type: FETCH_PROJECT,
  payload: getProject(id)
});
