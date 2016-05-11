import axios_ from 'axios';

const axios = axios_.create({
  baseURL: config.apiUri,
  timeout: 1000,
  headers: { Authorization: `Bearer ${apiToken}` }
});

export const getProjects = () => axios.get('/projects?select=id,name,customer{*}');

export const getProject = (id) => axios.get(`/projects?id=eq.${id}`, {
  headers: { Prefer: 'plurality=singular' }
});

export const updateProject = (id, data) => axios.patch(`/projects?id=eq.${id}`, data);
