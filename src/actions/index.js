import { getProjects } from '../apiclient';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';


export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: getProjects()
});
