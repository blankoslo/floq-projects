import axios_ from 'axios';

const axios = axios_.create({
  baseURL: config.apiUri,
  headers: {
    Authorization: `Bearer ${apiToken}`,
    Prefer: 'return=representation' // ask for the updated entity after modifications (e.g. PATCH)
  }
});

export const getProjects = () => axios.get('/projects?select=id,name,customer{*}&order=id.desc');

export const getProject = (id) => axios.get(`/projects?id=eq.${id}`, {
  headers: { Prefer: 'plurality=singular' }
});

export const updateProject = (id, data) => axios.patch(`/projects?id=eq.${id}`, data);

export const createProject = data => axios.post('/projects', data);

export const getCustomers = () => axios.get('/customers');
